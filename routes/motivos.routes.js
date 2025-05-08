const express = require('express');
const router = express.Router();
const MotivoService = require('../services/motivos.service');
const motivoService = new MotivoService();

// Ruta para crear un nuevo motivo
router.post('/', async (req, res, next) => {
  try {
    const motivo = await motivoService.create(req.body);
    res.status(201).json(motivo);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener todos los motivos
router.get('/', async (req, res, next) => {
  try {
    const motivos = await motivoService.find();
    res.status(200).json(motivos);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener un motivo por su ID
router.get('/:id', async (req, res, next) => {
  try {
    const motivo = await motivoService.findOne(req.params.id);
    res.status(200).json(motivo);
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar un motivo por su ID
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const response = await motivoService.update(id, changes);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar un motivo por su ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await motivoService.delete(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Ruta para paginar los motivos
router.get('/paginate', async (req, res, next) => {
  try {
    const { offset, limit, whereClause } = req.query;
    const parsedWhereClause = whereClause ? JSON.parse(whereClause) : {};
    const result = await motivoService.paginate(offset, limit, parsedWhereClause);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
