const express = require('express');
const MermaRapidaService = require('../services/merma_rapida.service');
const boom = require('@hapi/boom');

const router = express.Router();
const mermaRapidaService = new MermaRapidaService();

// Crear un nuevo registro de merma rápida
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const mermaRapida = await mermaRapidaService.create(data);
    res.status(201).json(mermaRapida);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Obtener todos los registros de merma rápida
router.get('/', async (req, res) => {
  try {
    const mermaRapidas = await mermaRapidaService.find();
    res.status(200).json(mermaRapidas);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Obtener un registro de merma rápida por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mermaRapida = await mermaRapidaService.findOne(id);
    res.status(200).json(mermaRapida);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Actualizar un registro de merma rápida
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const result = await mermaRapidaService.update(id, changes);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Eliminar un registro de merma rápida
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await mermaRapidaService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

// Paginación de los registros de merma rápida
router.get('/paginate', async (req, res) => {
  const { offset, limit, whereClause } = req.query;
  try {
    const result = await mermaRapidaService.paginate(offset, limit, whereClause);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json(error.isBoom ? error.output.payload : { message: 'Internal Server Error' });
  }
});

module.exports = router;
