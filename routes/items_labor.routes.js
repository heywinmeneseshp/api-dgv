const express = require('express');
const router = express.Router();
const ItemLaborService = require('../services/items_labor.service');
const boom = require('@hapi/boom');

const itemLaborService = new ItemLaborService();

// Crear un nuevo item de labor
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const newItemLabor = await itemLaborService.create(data);
    res.status(201).json(newItemLabor);
  } catch (error) {
    next(error);
  }
});

// Obtener todos los items de labor
router.get('/', async (req, res, next) => {
  try {
    const itemsLabor = await itemLaborService.find();
    res.status(200).json(itemsLabor);
  } catch (error) {
    next(error);
  }
});

// Obtener un item de labor por su ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemLabor = await itemLaborService.findOne(id);
    res.status(200).json(itemLabor);
  } catch (error) {
    next(error);
  }
});

// Actualizar un item de labor
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updatedItemLabor = await itemLaborService.update(id, changes);
    res.status(200).json(updatedItemLabor);
  } catch (error) {
    next(error);
  }
});

// Eliminar un item de labor
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedItemLabor = await itemLaborService.delete(id);
    res.status(200).json(deletedItemLabor);
  } catch (error) {
    next(error);
  }
});

// Paginación de items de labor
router.get('/paginate', async (req, res, next) => {
  try {
    const { offset, limit, whereClause } = req.query;
    const paginatedItemsLabor = await itemLaborService.paginate(offset, limit, whereClause);
    res.status(200).json(paginatedItemsLabor);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
