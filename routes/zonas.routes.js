const express = require('express');
const router = express.Router();
const ZonaService = require('../services/zonas.service');
const zonaService = new ZonaService();

// Crear una nueva zona
router.post('/', async (req, res, next) => {
  try {
    const zona = await zonaService.create(req.body);
    res.status(201).json(zona);
  } catch (error) {
    next(error);
  }
});

// Obtener todas las zonas
router.get('/', async (req, res, next) => {
  try {
    const zonas = await zonaService.find();
    res.status(200).json(zonas);
  } catch (error) {
    next(error);
  }
});

// Obtener una zona específica por ID
router.get('/:id', async (req, res, next) => {
  try {
    const zona = await zonaService.findOne(req.params.id);
    res.status(200).json(zona);
  } catch (error) {
    next(error);
  }
});

// Actualizar una zona específica por ID
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const result = await zonaService.update(id, changes);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Eliminar una zona específica por ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await zonaService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Paginación de zonas
router.get('/paginate', async (req, res, next) => {
  const { offset = 1, limit = 10, general, habilitado } = req.query;
  const whereClause = {};

  if (general) whereClause.general = general;
  if (habilitado !== undefined) whereClause.habilitado = habilitado === 'true'; // Convertimos el valor a booleano

  try {
    const result = await zonaService.paginate(offset, limit, whereClause);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
