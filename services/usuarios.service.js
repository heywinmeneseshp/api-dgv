const boom = require('@hapi/boom');
const db = require('../models');
const bcrypt = require('bcryptjs');

class UsuarioService {
  // Crear un nuevo Usuario
  async create(data) {
    try {
      // Encriptar la contraseña antes de crear el usuario
      if (data.contrasenha) {
        const hashedPassword = await bcrypt.hash(data.contrasenha, 10); // 10 es el número de rondas de sal
        data.contrasenha = hashedPassword;
      }

      // Crear el usuario en la base de datos
      const Usuario = await db.Usuario.create(data);

      return Usuario;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error al crear el Usuario');
    }
  }

  // Obtener todos los Usuarios
  async find() {
    return db.Usuario.findAll();
  }

  // Obtener un Usuario específico por ID
  async findOne(id) {
    const Usuario = await db.Usuario.findOne({ where: { id } });
    if (!Usuario) {
      throw boom.notFound('El Usuario no existe');
    }
    return Usuario;
  }


  // Actualizar un Usuario por ID
  async update(id, changes) {
    // Buscar al usuario por el ID
    const Usuario = await db.Usuario.findOne({ where: { id } });
    if (!Usuario) {
      throw boom.notFound('El Usuario no existe');
    }
  
    // Verificar si la contraseña está en los cambios
    if (changes.contrasenha) {
      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(changes.contrasenha, 10);
      // Reemplazar la contraseña en los cambios por la contraseña encriptada
      changes.contrasenha = hashedPassword;
    }
  
    // Actualizar el usuario con los cambios proporcionados
    await db.Usuario.update(changes, { where: { id } });
  
    return { message: 'El Usuario fue actualizado', id, changes };
  }


  // Eliminar un Usuario por ID
  async delete(id) {
    const Usuario = await db.Usuario.findOne({ where: { id } });
    if (!Usuario) {
      throw boom.notFound('El Usuario no existe');
    }
    await db.Usuario.destroy({ where: { id } });
    return { message: 'El Usuario fue eliminado', id };
  }

  // Paginación de Usuarios
  async paginate(offset = 1, limit = 10, whereClause = {}) {
    const parsedOffset = (parseInt(offset) - 1) * parseInt(limit);

    const [result, total] = await Promise.all([
      db.Usuario.findAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parsedOffset,
      }),
      db.Usuario.count({ where: whereClause }),
    ]);

    return { data: result, total };
  }
}

module.exports = UsuarioService;
