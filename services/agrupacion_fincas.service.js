const boom = require('@hapi/boom');
const db = require('../models');

class AgrupacionFincaService {
  // Crear una nueva agrupación de finca
  async create(data) {
    try {
      const agrupacionFinca = await db.AgrupacionFinca.create(data);
      return agrupacionFinca;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear la agrupación de finca');
    }
  }

  // Obtener todas las agrupaciones de finca
  async find() {
    return db.AgrupacionFinca.findAll();
  }

  // Obtener una agrupación de finca específica por ID
  async findOne(id) {
    const agrupacionFinca = await db.AgrupacionFinca.findOne({ where: { id } });
    if (!agrupacionFinca) {
      throw boom.notFound('La agrupación de finca no existe');
    }
    return agrupacionFinca;
  }

  // Actualizar una agrupación de finca específica por ID
  async update(id, changes) {
    const agrupacionFinca = await db.AgrupacionFinca.findOne({ where: { id } });
    if (!agrupacionFinca) {
      throw boom.notFound('La agrupación de finca no existe');
    }
    await db.AgrupacionFinca.update(changes, { where: { id } });
    return { message: 'La agrupación de finca fue actualizada', id, changes };
  }

  // Eliminar una agrupación de finca específica por ID
  async delete(id) {
    const agrupacionFinca = await db.AgrupacionFinca.findOne({ where: { id } });
    if (!agrupacionFinca) {
      throw boom.notFound('La agrupación de finca no existe');
    }
    await db.AgrupacionFinca.destroy({ where: { id } });
    return { message: 'La agrupación de finca fue eliminada', id };
  }

  // Paginación de agrupaciones de finca
  async paginate(offset, limit, whereClause = {}) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.AgrupacionFinca.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.AgrupacionFinca.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = AgrupacionFincaService;
