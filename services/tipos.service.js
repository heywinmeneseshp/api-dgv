const boom = require('@hapi/boom');
const db = require('../models');

class TipoService {
  // Crear un nuevo tipo
  async create(data) {
    try {
      const tipo = await db.Tipo.create(data);
      return tipo;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear el tipo');
    }
  }

  // Obtener todos los tipos
  async find() {
    return db.Tipo.findAll();
  }

  // Obtener un tipo específico por ID
  async findOne(id) {
    const tipo = await db.Tipo.findOne({ where: { id } });
    if (!tipo) {
      throw boom.notFound('El tipo no existe');
    }
    return tipo;
  }

  // Actualizar un tipo específico por ID
  async update(id, changes) {
    const tipo = await db.Tipo.findOne({ where: { id } });
    if (!tipo) {
      throw boom.notFound('El tipo no existe');
    }
    await db.Tipo.update(changes, { where: { id } });
    return { message: 'El tipo fue actualizado', id, changes };
  }

  // Eliminar un tipo específico por ID
  async delete(id) {
    const tipo = await db.Tipo.findOne({ where: { id } });
    if (!tipo) {
      throw boom.notFound('El tipo no existe');
    }
    await db.Tipo.destroy({ where: { id } });
    return { message: 'El tipo fue eliminado', id };
  }

  // Paginación de tipos
  async paginate(offset, limit, whereClause = {}) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Tipo.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Tipo.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = TipoService;
