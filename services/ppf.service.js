const boom = require('@hapi/boom');
const db = require('../models');

class PpfService {
  // Crear un nuevo Ppf
  async create(data) {
    try {
      const ppf = await db.Ppf.create(data);
      return ppf;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear el PPF');
    }
  }

  // Obtener todos los Ppf
  async find() {
    return db.Ppf.findAll();
  }

  // Obtener un Ppf por su ID
  async findOne(id) {
    const ppf = await db.Ppf.findOne({ where: { id } });
    if (!ppf) {
      throw boom.notFound('El PPF no existe');
    }
    return ppf;
  }

  // Actualizar un Ppf por su ID
  async update(id, changes) {
    const ppf = await db.Ppf.findOne({ where: { id } });
    if (!ppf) {
      throw boom.notFound('El PPF no existe');
    }
    await db.Ppf.update(changes, { where: { id } });
    return { message: 'El PPF fue actualizado', id, changes };
  }

  // Eliminar un Ppf por su ID
  async delete(id) {
    const ppf = await db.Ppf.findOne({ where: { id } });
    if (!ppf) {
      throw boom.notFound('El PPF no existe');
    }
    await db.Ppf.destroy({ where: { id } });
    return { message: 'El PPF fue eliminado', id };
  }

  // Paginación de los Ppf
  async paginate(offset, limit, whereClause) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Ppf.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Ppf.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = PpfService;
