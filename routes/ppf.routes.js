const express = require('express');
const router = express.Router();
const PpfService = require('../services/ppf.service');
const ppfService = new PpfService();

// Crear un nuevo Ppf
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const ppf = await ppfService.create(data);
    return res.status(201).json(ppf);
  } catch (error) {
    next(error);
  }
});

// Obtener todos los Ppf
router.get('/', async (req, res, next) => {
  try {
    const ppfList = await ppfService.find();
    return res.status(200).json(ppfList);
  } catch (error) {
    next(error);
  }
});

// Obtener un Ppf por ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const ppf = await ppfService.findOne(id);
    return res.status(200).json(ppf);
  } catch (error) {
    next(error);
  }
});

// Actualizar un Ppf por ID
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const result = await ppfService.update(id, changes);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Eliminar un Ppf por ID
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await ppfService.delete(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Paginación de Ppf
router.get('/paginate', async (req, res, next) => {
  const { offset = 1, limit = 10, whereClause = {} } = req.query;
  try {
    const result = await ppfService.paginate(offset, limit, whereClause);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
