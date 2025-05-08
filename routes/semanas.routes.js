const express = require('express');
const router = express.Router();
const SemanaService = require('../services/semanas.service');
const semanaService = new SemanaService();

// Crear una nueva semana
router.post('/', async (req, res, next) => {
  try {
    const semana = await semanaService.create(req.body);
    res.status(201).json(semana);
  } catch (error) {
    next(error);
  }
});

// Obtener todas las semanas
router.get('/', async (req, res, next) => {
  try {
    const semanas = await semanaService.find();
    res.status(200).json(semanas);
  } catch (error) {
    next(error);
  }
});

// Obtener una semana específica por ID
router.get('/:id', async (req, res, next) => {
  try {
    const semana = await semanaService.findOne(req.params.id);
    res.status(200).json(semana);
  } catch (error) {
    next(error);
  }
});

// Actualizar una semana específica por ID
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const result = await semanaService.update(id, changes);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Eliminar una semana específica por ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await semanaService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Paginación de semanas
router.get('/paginate', async (req, res, next) => {
  const { offset = 1, limit = 10, semana, anio } = req.query;
  const whereClause = {};

  if (semana) whereClause.semana = semana;
  if (anio) whereClause.anio = anio;

  try {
    const result = await semanaService.paginate(offset, limit, whereClause);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
