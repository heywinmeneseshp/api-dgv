const boom = require('@hapi/boom');
const db = require('../models');

class LaborService {
  // Crear un nuevo labor
  async create(data) {
    try {
      const labor = await db.Labor.create(data);
      return labor;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear el labor');
    }
  }

  // Obtener todos los labor
  async find() {
    return db.Labor.findAll();
  }

  // Obtener un labor por su ID
  async findOne(id) {
    const labor = await db.Labor.findOne({ where: { id } });
    if (!labor) {
      throw boom.notFound('El labor no existe');
    }
    return labor;
  }

  // Actualizar un labor
  async update(id, changes) {
    const labor = await db.Labor.findOne({ where: { id } });
    if (!labor) {
      throw boom.notFound('El labor no existe');
    }
    await db.Labor.update(changes, { where: { id } });
    return { message: 'El labor fue actualizado', id, changes };
  }

  // Eliminar un labor
  async delete(id) {
    const labor = await db.Labor.findOne({ where: { id } });
    if (!labor) {
      throw boom.notFound('El labor no existe');
    }
    await db.Labor.destroy({ where: { id } });
    return { message: 'El labor fue eliminado', id };
  }

  // Paginación de labor
  async paginate(offset, limit, whereClause) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Labor.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Labor.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = LaborService;
