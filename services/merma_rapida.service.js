const boom = require('@hapi/boom');
const db = require('../models');

class MermaRapidaService {
  async create(data) {
    try {
      const mermaRapida = await db.MermaRapida.create(data);
      return mermaRapida;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear la merma rápida');
    }
  }

  async find() {
    return db.MermaRapida.findAll();
  }

  async findOne(id) {
    const mermaRapida = await db.MermaRapida.findOne({ where: { id } });
    if (!mermaRapida) {
      throw boom.notFound('La merma rápida no existe');
    }
    return mermaRapida;
  }

  async update(id, changes) {
    const mermaRapida = await db.MermaRapida.findOne({ where: { id } });
    if (!mermaRapida) {
      throw boom.notFound('La merma rápida no existe');
    }
    await db.MermaRapida.update(changes, { where: { id } });
    return { message: 'La merma rápida fue actualizada', id, changes };
  }

  async delete(id) {
    const mermaRapida = await db.MermaRapida.findOne({ where: { id } });
    if (!mermaRapida) {
      throw boom.notFound('La merma rápida no existe');
    }
    await db.MermaRapida.destroy({ where: { id } });
    return { message: 'La merma rápida fue eliminada', id };
  }

  async paginate(offset, limit, whereClause) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.MermaRapida.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.MermaRapida.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = MermaRapidaService;
