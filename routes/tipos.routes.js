const express = require('express');
const router = express.Router();
const TipoService = require('../services/tipos.service');
const tipoService = new TipoService();

// Crear un nuevo tipo
router.post('/', async (req, res, next) => {
  try {
    const tipo = await tipoService.create(req.body);
    res.status(201).json(tipo);
  } catch (error) {
    next(error);
  }
});

// Obtener todos los tipos
router.get('/', async (req, res, next) => {
  try {
    const tipos = await tipoService.find();
    res.status(200).json(tipos);
  } catch (error) {
    next(error);
  }
});

// Obtener un tipo específico por ID
router.get('/:id', async (req, res, next) => {
  try {
    const tipo = await tipoService.findOne(req.params.id);
    res.status(200).json(tipo);
  } catch (error) {
    next(error);
  }
});

// Actualizar un tipo específico por ID
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const result = await tipoService.update(id, changes);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Eliminar un tipo específico por ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await tipoService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Paginación de tipos
router.get('/paginate', async (req, res, next) => {
  const { offset = 1, limit = 10, tipo, habilitado } = req.query;
  const whereClause = {};

  if (tipo) whereClause.tipo = tipo;
  if (habilitado !== undefined) whereClause.habilitado = habilitado === 'true'; // Convertimos el valor a booleano

  try {
    const result = await tipoService.paginate(offset, limit, whereClause);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
