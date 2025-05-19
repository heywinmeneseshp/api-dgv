const boom = require('@hapi/boom');
const { Op, or } = require('sequelize');
const db = require('../models');

class ComercializadoraService {
  async create(data) {
    try {
      const comercializadora = await db.Comercializadora.create(data);
      return comercializadora;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear la comercializadora');
    }
  }

  async find() {
    return db.Comercializadora.findAll();
  }

  async findOne(id) {
    const comercializadora = await db.Comercializadora.findOne({ where: { id } });
    if (!comercializadora) {
      throw boom.notFound('La comercializadora no existe');
    }
    return comercializadora;
  }

  async update(id, changes) {
    console.log('changes', changes);
    const comercializadora = await db.Comercializadora.findOne({ where: { id } });
    if (!comercializadora) {
      throw boom.notFound('La comercializadora no existe');
    }
    await db.Comercializadora.update(changes, { where: { id } });
    return { message: 'La comercializadora fue actualizada', id, changes };
  }

  async delete(id) {
    const comercializadora = await db.Comercializadora.findOne({ where: { id } });
    if (!comercializadora) {
      throw boom.notFound('La comercializadora no existe');
    }
    await db.Comercializadora.destroy({ where: { id } });
    return { message: 'La comercializadora fue eliminada', id };
  }

  async paginate(offset, limit, whereClause = {}) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Comercializadora.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
        order: [['id', 'DESC']],
      }),
      db.Comercializadora.count({ where: whereClause }),
    ]);

    return {
      data: result,
      total,
      page: offset,
      pages: Math.ceil(total / limit),
    };
  }
}

module.exports = ComercializadoraService;
