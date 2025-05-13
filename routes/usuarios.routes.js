const express = require('express');
const UsuarioService = require('../services/usuarios.service');
const router = express.Router();

const service = new UsuarioService();

// Obtener todos los usuarios
router.get('/', async (req, res, next) => {
  try {
    const usuarios = await service.find();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await service.findOne(id);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const newUsuario = await service.create(data);
    res.status(201).json(newUsuario);
  } catch (error) {
    next(error);
  }
});

// Actualizar un usuario por ID
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const result = await service.update(id, changes);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Eliminar un usuario por ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Paginación (opcional)
router.get('/paginate/all', async (req, res, next) => {
  try {
    const { offset = 1, limit = 10 } = req.query;
    const result = await service.paginate(offset, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
