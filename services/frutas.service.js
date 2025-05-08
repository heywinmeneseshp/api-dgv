const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const db = require('../models');

class FrutaService {
  async create(data) {
    try {
      const fruta = await db.Fruta.create(data);
      return fruta;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear la fruta');
    }
  }

  async find() {
    return db.Fruta.findAll();
  }

  async findOne(id) {
    const fruta = await db.Fruta.findOne({ where: { id } });
    if (!fruta) {
      throw boom.notFound('La fruta no existe');
    }
    return fruta;
  }

  async update(id, changes) {
    const fruta = await db.Fruta.findOne({ where: { id } });
    if (!fruta) {
      throw boom.notFound('La fruta no existe');
    }
    await db.Fruta.update(changes, { where: { id } });
    return { message: 'La fruta fue actualizada', id, changes };
  }

  async delete(id) {
    const fruta = await db.Fruta.findOne({ where: { id } });
    if (!fruta) {
      throw boom.notFound('La fruta no existe');
    }
    await db.Fruta.destroy({ where: { id } });
    return { message: 'La fruta fue eliminada', id };
  }

  async paginate(offset, limit, whereClause = {}) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Fruta.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Fruta.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = FrutaService;
