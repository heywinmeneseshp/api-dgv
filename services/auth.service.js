const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const nodemailer = require('nodemailer'); // Para enviar correos electrónicos

class AuthService {
  // Método de login
  async login(username, password) {
    const user = await db.Usuario.findOne({ where: { usuario: username } });
    if (!user) {
      throw boom.unauthorized('Correo no registrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.contrasenha);
    if (!passwordMatch) {
      throw boom.unauthorized('Contraseña incorrecta');
    }

    const payload = {
      id: user.id,
      usuario: user.usuario,
      nombre: user.nombre,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secreto123', {
      expiresIn: '1d',
    });

    return {
      usuario: payload,
      token,
    };
  }

  // Método para solicitar recuperación de contraseña
  async requestPasswordReset(email) {
    const user = await db.Usuario.findOne({ where: { correo: email } });
    if (!user) {
      throw boom.unauthorized('Correo no registrado');
    }

    // Generar un token único de recuperación
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secreto123', {
      expiresIn: '1h', // El token expirará en 1 hora
    });

    // Enviar correo electrónico con el enlace de recuperación
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Usa el servicio de correo de tu preferencia
      auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS, // Tu contraseña o App Password
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
    });

    return { message: 'Correo enviado con éxito.' };
  }

  // Método para restablecer la contraseña
  async resetPassword(token, newPassword) {
    try {
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto123');

      // Buscar el usuario por el id
      const user = await db.Usuario.findByPk(decoded.id);
      if (!user) {
        throw boom.notFound('Usuario no encontrado');
      }

      // Cifrar la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña en la base de datos
      user.contrasenha = hashedPassword;
      await user.save();

      return { message: 'Contraseña actualizada exitosamente.' };
    } catch (error) {
      throw boom.badRequest('Token de recuperación inválido o expirado');
    }
  }
}

module.exports = AuthService;
