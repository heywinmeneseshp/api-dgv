const boom = require('@hapi/boom');
const db = require('../models');

class LoteService {
  async create(data) {
    try {
      const lote = await db.Lote.create(data);
      return lote;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear el lote');
    }
  }

  async find() {
    return db.Lote.findAll();
  }

  async findOne(id) {
    const lote = await db.Lote.findOne({ where: { id } });
    if (!lote) {
      throw boom.notFound('El lote no existe');
    }
    return lote;
  }

  async update(id, changes) {
    const lote = await db.Lote.findOne({ where: { id } });
    if (!lote) {
      throw boom.notFound('El lote no existe');
    }
    await db.Lote.update(changes, { where: { id } });
    return { message: 'El lote fue actualizado', id, changes };
  }

  async delete(id) {
    const lote = await db.Lote.findOne({ where: { id } });
    if (!lote) {
      throw boom.notFound('El lote no existe');
    }
    await db.Lote.destroy({ where: { id } });
    return { message: 'El lote fue eliminado', id };
  }

  async paginate(offset, limit, whereClause) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Lote.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Lote.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = LoteService;
