const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const db = require('../models');

class GrupoLaborService {
  // Crear un nuevo grupo laboral
  async create(data) {
    try {
      const grupoLabor = await db.GrupoLabor.create(data);
      return grupoLabor;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear el grupo laboral');
    }
  }

  // Obtener todos los grupos laborales
  async find() {
    return db.GrupoLabor.findAll();
  }

  // Obtener un grupo laboral específico
  async findOne(id) {
    const grupoLabor = await db.GrupoLabor.findOne({ where: { id } });
    if (!grupoLabor) {
      throw boom.notFound('El grupo laboral no existe');
    }
    return grupoLabor;
  }

  // Actualizar un grupo laboral
  async update(id, changes) {
    const grupoLabor = await db.GrupoLabor.findOne({ where: { id } });
    if (!grupoLabor) {
      throw boom.notFound('El grupo laboral no existe');
    }
    await db.GrupoLabor.update(changes, { where: { id } });
    return { message: 'El grupo laboral fue actualizado', id, changes };
  }

  // Eliminar un grupo laboral
  async delete(id) {
    const grupoLabor = await db.GrupoLabor.findOne({ where: { id } });
    if (!grupoLabor) {
      throw boom.notFound('El grupo laboral no existe');
    }
    await db.GrupoLabor.destroy({ where: { id } });
    return { message: 'El grupo laboral fue eliminado', id };
  }

  // Paginación de grupos laborales
  async paginate(offset, limit, whereClause) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.GrupoLabor.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.GrupoLabor.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = GrupoLaborService;
