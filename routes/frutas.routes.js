const express = require('express');
const FrutaService = require('../services/frutas.service');
const router = express.Router();

const service = new FrutaService();

router.get('/', async (req, res, next) => {
  try {
    const frutas = await service.find();
    res.json(frutas);
  } catch (error) {
    next(error);
  }
});

router.get('/paginate', async (req, res, next) => {
  try {
    const { offset = 1, limit = 10, tipo, habilitado } = req.query;
    const whereClause = {};

    if (tipo) whereClause.tipo = { [Op.like]: `%${tipo}%` };
    if (habilitado !== undefined) whereClause.habilitado = habilitado === 'true';

    const result = await service.paginate(offset, limit, whereClause);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const fruta = await service.findOne(req.params.id);
    res.json(fruta);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newFruta = await service.create(req.body);
    res.status(201).json(newFruta);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await service.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
