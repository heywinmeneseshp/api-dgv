const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const db = require('../models');

class CompaniaService {
  async create(data) {
    try {
      const compania = await db.Compania.create(data);
      return compania;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear la compañía');
    }
  }

  async find() {
    return db.Compania.findAll();
  }

  async findOne(id) {
    const compania = await db.Compania.findOne({ where: { id } });
    if (!compania) {
      throw boom.notFound('La compañía no existe');
    }
    return compania;
  }

  async update(id, changes) {
    const compania = await db.Compania.findOne({ where: { id } });
    if (!compania) {
      throw boom.notFound('La compañía no existe');
    }
    await db.Compania.update(changes, { where: { id } });
    return { message: 'La compañía fue actualizada', id, changes };
  }

  async delete(id) {
    const compania = await db.Compania.findOne({ where: { id } });
    if (!compania) {
      throw boom.notFound('La compañía no existe');
    }
    await db.Compania.destroy({ where: { id } });
    return { message: 'La compañía fue eliminada', id };
  }

  async paginate(offset, limit, whereClause) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Compania.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Compania.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = CompaniaService;
