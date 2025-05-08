const express = require('express');
const LoteService = require('../services/lotes.service');
const boom = require('@hapi/boom');

const router = express.Router();
const loteService = new LoteService();

// Crear un nuevo lote
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const lote = await loteService.create(data);
    res.status(201).json(lote);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Obtener todos los lotes
router.get('/', async (req, res) => {
  try {
    const lotes = await loteService.find();
    res.status(200).json(lotes);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Obtener un lote por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const lote = await loteService.findOne(id);
    res.status(200).json(lote);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Actualizar un lote
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const result = await loteService.update(id, changes);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Eliminar un lote
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await loteService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Paginación de lotes
router.get('/paginate', async (req, res) => {
  const { offset, limit, whereClause } = req.query;
  try {
    const result = await loteService.paginate(offset, limit, whereClause);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

module.exports = router;
