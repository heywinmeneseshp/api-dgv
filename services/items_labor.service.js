const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const db = require('../models');

class ItemLaborService {
  async create(data) {
    try {
      const itemLabor = await db.ItemLabor.create(data);
      return itemLabor;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear el item de labor');
    }
  }

  async find() {
    return db.ItemLabor.findAll();
  }

  async findOne(id) {
    const itemLabor = await db.ItemLabor.findOne({ where: { id } });
    if (!itemLabor) {
      throw boom.notFound('El item de labor no existe');
    }
    return itemLabor;
  }

  async update(id, changes) {
    const itemLabor = await db.ItemLabor.findOne({ where: { id } });
    if (!itemLabor) {
      throw boom.notFound('El item de labor no existe');
    }
    await db.ItemLabor.update(changes, { where: { id } });
    return { message: 'El item de labor fue actualizado', id, changes };
  }

  async delete(id) {
    const itemLabor = await db.ItemLabor.findOne({ where: { id } });
    if (!itemLabor) {
      throw boom.notFound('El item de labor no existe');
    }
    await db.ItemLabor.destroy({ where: { id } });
    return { message: 'El item de labor fue eliminado', id };
  }

  async paginate(offset, limit, whereClause) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.ItemLabor.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.ItemLabor.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = ItemLaborService;
