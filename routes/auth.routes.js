const express = require('express');
const AuthService = require('../services/AuthService'); // Suponiendo que AuthService está en la carpeta services
const boom = require('@hapi/boom');

const router = express.Router();
const authService = new AuthService();

// Ruta para login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.json(result);
  } catch (error) {
    next(error); // Pasar el error al manejador de errores
  }
});

// Ruta para solicitar la recuperación de contraseña
router.post('/request-password-reset', async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.requestPasswordReset(email);
    res.json(result);
  } catch (error) {
    next(error); // Pasar el error al manejador de errores
  }
});

// Ruta para restablecer la contraseña
router.post('/reset-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    res.json(result);
  } catch (error) {
    next(error); // Pasar el error al manejador de errores
  }
});

module.exports = router;
