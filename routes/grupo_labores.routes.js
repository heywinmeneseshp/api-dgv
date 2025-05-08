const express = require('express');
const GrupoLaborService = require('../services/grupo_labores.service');
const boom = require('@hapi/boom');

const router = express.Router();
const grupoLaborService = new GrupoLaborService();

// Ruta para crear un nuevo grupo laboral
router.post('/', async (req, res, next) => {
  try {
    const grupoLabor = await grupoLaborService.create(req.body);
    res.status(201).json(grupoLabor);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener todos los grupos laborales
router.get('/', async (req, res, next) => {
  try {
    const gruposLaborales = await grupoLaborService.find();
    res.status(200).json(gruposLaborales);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener un grupo laboral específico por ID
router.get('/:id', async (req, res, next) => {
  try {
    const grupoLabor = await grupoLaborService.findOne(req.params.id);
    res.status(200).json(grupoLabor);
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar un grupo laboral por ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedGrupoLabor = await grupoLaborService.update(req.params.id, req.body);
    res.status(200).json(updatedGrupoLabor);
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar un grupo laboral por ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedGrupoLabor = await grupoLaborService.delete(req.params.id);
    res.status(200).json(deletedGrupoLabor);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener los grupos laborales con paginación
router.get('/paginate', async (req, res, next) => {
  const { offset = 1, limit = 10, grupo } = req.query;
  const whereClause = grupo ? { grupo: { [Op.like]: `%${grupo}%` } } : {};

  try {
    const { data, total } = await grupoLaborService.paginate(offset, limit, whereClause);
    res.status(200).json({ data, total });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
