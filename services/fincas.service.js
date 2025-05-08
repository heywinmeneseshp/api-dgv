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
    return db.Finca.findAll();
  }

  async findOne(id) {
    const finca = await db.Finca.findOne({ where: { id } });
    if (!finca) {
      throw boom.notFound('La finca no existe');
    }
    return finca;
  }

  async update(id, changes) {
    const finca = await db.Finca.findOne({ where: { id } });
    if (!finca) {
      throw boom.notFound('La finca no existe');
    }
    await db.Finca.update(changes, { where: { id } });
    return { message: 'La finca fue actualizada', id, changes };
  }

  async delete(id) {
    const finca = await db.Finca.findOne({ where: { id } });
    if (!finca) {
      throw boom.notFound('La finca no existe');
    }
    await db.Finca.destroy({ where: { id } });
    return { message: 'La finca fue eliminada', id };
  }

  async paginate(offset, limit, whereClause = {}) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Finca.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Finca.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = FincaService;
