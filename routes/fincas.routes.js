const express = require('express');
const FincaService = require('../services/fincas.service');

const router = express.Router();
const service = new FincaService();

router.get('/', async (req, res, next) => {
  try {
    const fincas = await service.find();
    res.json(fincas);
  } catch (error) {
    next(error);
  }
});

router.get('/paginate', async (req, res, next) => {
  try {
    const { offset = 1, limit = 10, habilitado = [true, false] } = req.query;
    const filters = {
      habilitado
    };
    const result = await service.paginate(offset, limit, filters);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const finca = await service.findOne(id);
    res.json(finca);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const newFinca = await service.create(data);
    res.status(201).json(newFinca);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updatedFinca = await service.update(id, changes);
    res.json(updatedFinca);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedFinca = await service.delete(id);
    res.json(deletedFinca);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
