const boom = require('@hapi/boom');
const db = require('../models');

class MotivoService {
  // Crear un nuevo motivo
  async create(data) {
    try {
      const motivo = await db.Motivo.create(data);
      return motivo;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear el motivo');
    }
  }

  // Obtener todos los motivos
  async find() {
    return db.Motivo.findAll();
  }

  // Obtener un motivo específico por ID
  async findOne(id) {
    const motivo = await db.Motivo.findOne({ where: { id } });
    if (!motivo) {
      throw boom.notFound('El motivo no existe');
    }
    return motivo;
  }

  // Actualizar un motivo existente por ID
  async update(id, changes) {
    const motivo = await db.Motivo.findOne({ where: { id } });
    if (!motivo) {
      throw boom.notFound('El motivo no existe');
    }
    await db.Motivo.update(changes, { where: { id } });
    return { message: 'El motivo fue actualizado', id, changes };
  }

  // Eliminar un motivo por ID
  async delete(id) {
    const motivo = await db.Motivo.findOne({ where: { id } });
    if (!motivo) {
      throw boom.notFound('El motivo no existe');
    }
    await db.Motivo.destroy({ where: { id } });
    return { message: 'El motivo fue eliminado', id };
  }

  // Paginación de motivos
  async paginate(offset, limit, whereClause) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Motivo.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Motivo.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = MotivoService;
