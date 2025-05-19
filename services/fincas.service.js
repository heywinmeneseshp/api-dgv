const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const db = require('../models');

class FincaService {
  async create(data) {
    try {
      const finca = await db.Finca.create(data);
      return finca;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear la finca');
    }
  }

  async find() {
    try {
      return await db.Finca.findAll({
        include: [
          {
            model: db.Comercializadora,
            as: 'comercializadora',
            attributes: ['nombre_comercial'],
          },
        ],
        order: [['createdAt', 'ASC']], // 👈 orden ascendente (de más antiguo a más reciente)
      });
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
      throw boom.badRequest('Error al obtener las fincas');
    }
  }



  async findOne(id) {
    const finca = await db.Finca.findByPk(id, {
      include: [
        {
          model: db.Comercializadora,
          as: 'comercializadora',
          attributes: ['nombre_comercial'],
        },],
    });

    if (!finca) {
      throw boom.notFound('La finca no existe');
    }

    return finca;
  }

  async update(id, changes) {
    const finca = await db.Finca.findByPk(id);
    if (!finca) {
      throw boom.notFound('La finca no existe');
    }

    try {
      await finca.update(changes);
      return { message: 'Finca actualizada exitosamente', id, changes };
    } catch (error) {
      throw boom.badRequest('Error al actualizar la finca');
    }
  }

  async delete(id) {
    const finca = await db.Finca.findByPk(id);
    if (!finca) {
      throw boom.notFound('La finca no existe');
    }

    try {
      await finca.destroy();
      return { message: 'Finca eliminada exitosamente', id };
    } catch (error) {
      throw boom.badImplementation('Error al eliminar la finca');
    }
  }

  async paginate(page = 1, limit = 10, filters = {}) {
    console.log(filters)
    const offset = (parseInt(page) - 1) * parseInt(limit);

    try {
      const { rows: data, count: total } = await db.Finca.findAndCountAll({
        where: filters,
        limit: parseInt(limit),
        offset,
        order: [['id', 'DESC']],
        include: [
          {
            model: db.Comercializadora,
            as: 'comercializadora',
            attributes: ['nombre_comercial'],
          },
        {
            model: db.AgrupacionFinca,
            as: 'agrupacion_fincas',
            attributes: ['grupo'],
          },
        ],
      });

      return {
        data,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw boom.badImplementation('Error al paginar fincas');
    }
  }
}

module.exports = FincaService;
