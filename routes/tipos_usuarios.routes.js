const express = require("express");
const PruebaService = require('../services/prueba.service');
const router = express.Router();

const service = new PruebaService();


router.get("/", async (req, res, next) => {
  try {
    const result = await service.prueba()
    res.json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
