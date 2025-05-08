const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const db = require('../models');

class CalibracionLargoService {
  // Crear una nueva calibración
  async create(data) {
    try {
      const calibracion = await db.CalibracionLargo.create(data);
      return calibracion;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear la calibración');
    }
  }

  // Obtener todas las calibraciones
  async find() {
    try {
      const calibraciones = await db.CalibracionLargo.findAll();
      return calibraciones;
    } catch (error) {
      throw boom.internal(error.message || 'Error al obtener las calibraciones');
    }
  }

  // Obtener una calibración específica por ID
  async findOne(id) {
    try {
      const calibracion = await db.CalibracionLargo.findOne({ where: { id } });
      if (!calibracion) {
        throw boom.notFound('La calibración no existe');
      }
      return calibracion;
    } catch (error) {
      throw boom.internal(error.message || 'Error al obtener la calibración');
    }
  }

  // Actualizar una calibración específica
  async update(id, changes) {
    try {
      const calibracion = await db.CalibracionLargo.findOne({ where: { id } });
      if (!calibracion) {
        throw boom.notFound('La calibración no existe');
      }
      await db.CalibracionLargo.update(changes, { where: { id } });
      return { message: 'La calibración fue actualizada', id, changes };
    } catch (error) {
      throw boom.internal(error.message || 'Error al actualizar la calibración');
    }
  }

  // Eliminar una calibración
  async delete(id) {
    try {
      const calibracion = await db.CalibracionLargo.findOne({ where: { id } });
      if (!calibracion) {
        throw boom.notFound('La calibración no existe');
      }
      await db.CalibracionLargo.destroy({ where: { id } });
      return { message: 'La calibración fue eliminada', id };
    } catch (error) {
      throw boom.internal(error.message || 'Error al eliminar la calibración');
    }
  }

  // Paginación de calibraciones con filtros
  async paginate(offset, limit, whereClause) {
    try {
      const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);
      const [result, total] = await Promise.all([
        db.CalibracionLargo.findAll({
          where: whereClause,
          limit: parseInt(limit),
          offset: parsedOffset,
        }),
        db.CalibracionLargo.count({ where: whereClause }),
      ]);
      return { data: result, total };
    } catch (error) {
      throw boom.internal(error.message || 'Error en la paginación de calibraciones');
    }
  }
}

module.exports = CalibracionLargoService;
