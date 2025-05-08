const boom = require('@hapi/boom');
const db = require('../models');

class ZonaService {
  // Crear una nueva zona
  async create(data) {
    try {
      const zona = await db.Zona.create(data);
      return zona;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear la zona');
    }
  }

  // Obtener todas las zonas
  async find() {
    return db.Zona.findAll();
  }

  // Obtener una zona específica por ID
  async findOne(id) {
    const zona = await db.Zona.findOne({ where: { id } });
    if (!zona) {
      throw boom.notFound('La zona no existe');
    }
    return zona;
  }

  // Actualizar una zona específica por ID
  async update(id, changes) {
    const zona = await db.Zona.findOne({ where: { id } });
    if (!zona) {
      throw boom.notFound('La zona no existe');
    }
    await db.Zona.update(changes, { where: { id } });
    return { message: 'La zona fue actualizada', id, changes };
  }

  // Eliminar una zona específica por ID
  async delete(id) {
    const zona = await db.Zona.findOne({ where: { id } });
    if (!zona) {
      throw boom.notFound('La zona no existe');
    }
    await db.Zona.destroy({ where: { id } });
    return { message: 'La zona fue eliminada', id };
  }

  // Paginación de zonas
  async paginate(offset, limit, whereClause = {}) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Zona.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Zona.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = ZonaService;
