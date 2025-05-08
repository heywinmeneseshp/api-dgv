const express = require('express');
const LaborService = require('../services/labores.service');
const boom = require('@hapi/boom');

const router = express.Router();
const laborService = new LaborService();

// Crear un nuevo labor
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const labor = await laborService.create(data);
    res.status(201).json(labor);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Obtener todos los labor
router.get('/', async (req, res) => {
  try {
    const labor = await laborService.find();
    res.status(200).json(labor);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Obtener un labor por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const labor = await laborService.findOne(id);
    res.status(200).json(labor);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Actualizar un labor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const result = await laborService.update(id, changes);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Eliminar un labor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await laborService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Paginación de labor
router.get('/paginate', async (req, res) => {
  const { offset, limit, whereClause } = req.query;
  try {
    const result = await laborService.paginate(offset, limit, whereClause);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

module.exports = router;
