const express = require('express');
const CompaniaService = require('../services/companias.service');
const router = express.Router();
const service = new CompaniaService();

router.get('/', async (req, res, next) => {
  try {
    const data = await service.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/paginate', async (req, res, next) => {
  try {
    const { offset = 1, limit = 10, razon_social = '' } = req.query;

    const whereClause = razon_social
      ? { razon_social: { [require('sequelize').Op.iLike]: `%${razon_social}%` } }
      : {};

    const data = await service.paginate(offset, limit, whereClause);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const compania = await service.findOne(id);
    res.json(compania);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const nueva = await service.create(body);
    res.status(201).json(nueva);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updated = await service.update(id, body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
