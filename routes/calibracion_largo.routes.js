const express = require('express');
const router = express.Router();
const CalibracionLargoService = require('../services/calibracion_largo.service');
const calibracionService = new CalibracionLargoService();

// Crear calibración
router.post('/calibracion', async (req, res) => {
  try {
    const data = req.body; // Recibe los datos del body
    const calibracion = await calibracionService.create(data);
    res.status(201).json(calibracion);
  } catch (error) {
    res.status(error.output?.statusCode || 500).json(error.message);
  }
});

// Obtener todas las calibraciones
router.get('/calibraciones', async (req, res) => {
  try {
    const calibraciones = await calibracionService.find();
    res.status(200).json(calibraciones);
  } catch (error) {
    res.status(error.output?.statusCode || 500).json(error.message);
  }
});

// Obtener una calibración por ID
router.get('/calibracion/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const calibracion = await calibracionService.findOne(id);
    res.status(200).json(calibracion);
  } catch (error) {
    res.status(error.output?.statusCode || 500).json(error.message);
  }
});

// Actualizar calibración
router.put('/calibracion/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const changes = req.body;
    const updatedCalibracion = await calibracionService.update(id, changes);
    res.status(200).json(updatedCalibracion);
  } catch (error) {
    res.status(error.output?.statusCode || 500).json(error.message);
  }
});

// Eliminar calibración
router.delete('/calibracion/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await calibracionService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.output?.statusCode || 500).json(error.message);
  }
});

// Paginación de calibraciones
router.get('/calibraciones/paginate', async (req, res) => {
  try {
    const { offset, limit, whereClause } = req.query;
    const paginatedResult = await calibracionService.paginate(offset, limit, JSON.parse(whereClause));
    res.status(200).json(paginatedResult);
  } catch (error) {
    res.status(error.output?.statusCode || 500).json(error.message);
  }
});

module.exports = router;
