const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const AgrupacionFincaService = require('../services/agrupacion_fincas.service');
const agrupacionFincaService = new AgrupacionFincaService();

// Crear una nueva agrupación de finca
router.post('/', async (req, res, next) => {
  try {
    const agrupacionFinca = await agrupacionFincaService.create(req.body);
    res.status(201).json(agrupacionFinca);
  } catch (error) {
    next(error);
  }
});

// Obtener todas las agrupaciones de finca
router.get('/', async (req, res, next) => {
  try {
    const agrupaciones = await agrupacionFincaService.find();
    res.status(200).json(agrupaciones);
  } catch (error) {
    next(error);
  }
});


router.get('/paginate', async (req, res, next) => {
  try {
    const {
      offset = 1, limit = 10, grupo, habilitado = [true, false] } = req.query;

    const whereClause = { habilitado };
    // Filtro por estado "habilitado"


    // Búsqueda parcial en "grupo"
    if (grupo) {
      whereClause.grupo = { [Op.like]: `%${grupo}%` }; // usa Op.iLike si usas PostgreSQL
    }
    const result = await agrupacionFincaService.paginate(offset, limit, whereClause);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});


// Obtener una agrupación de finca específica por ID
router.get('/:id', async (req, res, next) => {
  try {
    const agrupacionFinca = await agrupacionFincaService.findOne(req.params.id);
    res.status(200).json(agrupacionFinca);
  } catch (error) {
    next(error);
  }
});

// Actualizar una agrupación de finca específica por ID
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const result = await agrupacionFincaService.update(id, changes);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Eliminar una agrupación de finca específica por ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await agrupacionFincaService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Paginación de agrupaciones de finca


module.exports = router;
