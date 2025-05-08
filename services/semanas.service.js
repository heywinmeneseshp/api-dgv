const boom = require('@hapi/boom');
const db = require('../models');

class SemanaService {
  // Crear una nueva semana
  async create(data) {
    try {
      const semana = await db.Semana.create(data);
      return semana;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear la semana');
    }
  }

  // Obtener todas las semanas
  async find() {
    return db.Semana.findAll();
  }

  // Obtener una semana específica por ID
  async findOne(id) {
    const semana = await db.Semana.findOne({ where: { id } });
    if (!semana) {
      throw boom.notFound('La semana no existe');
    }
    return semana;
  }

  // Actualizar una semana específica por ID
  async update(id, changes) {
    const semana = await db.Semana.findOne({ where: { id } });
    if (!semana) {
      throw boom.notFound('La semana no existe');
    }
    await db.Semana.update(changes, { where: { id } });
    return { message: 'La semana fue actualizada', id, changes };
  }

  // Eliminar una semana específica por ID
  async delete(id) {
    const semana = await db.Semana.findOne({ where: { id } });
    if (!semana) {
      throw boom.notFound('La semana no existe');
    }
    await db.Semana.destroy({ where: { id } });
    return { message: 'La semana fue eliminada', id };
  }

  // Paginación de semanas
  async paginate(offset, limit, whereClause = {}) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Semana.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Semana.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = SemanaService;
