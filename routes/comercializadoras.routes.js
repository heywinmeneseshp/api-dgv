const express = require('express');
const ComercializadoraService = require('../services/comercializadoras.service');
//const validatorHandler = require('../middlewares/validator.handler');
const { Op } = require('sequelize');

const router = express.Router();
const service = new ComercializadoraService();

// Crear una comercializadora
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const nueva = await service.create(data);
    res.status(201).json(nueva);
  } catch (error) {
    next(error);
  }
});

// Obtener todas
router.get('/', async (req, res, next) => {
  try {
    const comercializadoras = await service.find();
    res.json(comercializadoras);
  } catch (error) {
    next(error);
  }
});

// Paginación con filtros opcionales
router.get('/paginate', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, nombre = '', razon = '', habilitado } = req.query;
    const whereClause = {};

    if (nombre) {
      whereClause.nombre_comercial = { [Op.like]: `%${nombre}%` };
    }
    if (razon) {
      whereClause.razon_social = { [Op.like]: `%${razon}%` };
    }
    if (habilitado !== undefined) {
      whereClause.habilitado = habilitado === 'true';
    }

    const data = await service.paginate(page, limit, whereClause);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Buscar una por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const comercializadora = await service.findOne(id);
    res.json(comercializadora);
  } catch (error) {
    next(error);
  }
});

// Actualizar una
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const result = await service.update(id, changes);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Eliminar una
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
