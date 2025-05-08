const express = require('express');

// Importación de routers
const pruebaRouter = require('./prueba.router');
const tiposUsuariosRouter = require('./tipos_usuarios.routes');
const usuariosRouter = require('./usuarios.routes');
const tiposRouter = require('./tipos.routes');
const motivosRouter = require('./motivos.routes');
const semanasRouter = require('./semanas.routes');
const agrupacionFincasRouter = require('./agrupacion_fincas.routes');
const comercializadorasRouter = require('./comercializadoras.routes');
const fincasRouter = require('./fincas.routes');
const lotesRouter = require('./lotes.routes');
const zonasRouter = require('./zonas.routes');
const calibracionLargoRouter = require('./calibracion_largo.routes');
const ppfRouter = require('./ppf.routes');
const grupoLaboresRouter = require('./grupo_labores.routes');
const laboresRouter = require('./labores.routes');
const itemsLaborRouter = require('./items_labor.routes');
const frutasRouter = require('./frutas.routes');
const mermaRapidaRouter = require('./merma_rapida.routes');
const companiasRouter = require('./companias.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  // Ruta de prueba
  router.use('/prueba', pruebaRouter);

  // Rutas del sistema
  router.use('/tipos-usuarios', tiposUsuariosRouter);
  router.use('/usuarios', usuariosRouter);
  router.use('/tipos', tiposRouter);
  router.use('/motivos', motivosRouter);
  router.use('/semanas', semanasRouter);
  router.use('/agrupacion-fincas', agrupacionFincasRouter);
  router.use('/comercializadoras', comercializadorasRouter);
  router.use('/fincas', fincasRouter);
  router.use('/lotes', lotesRouter);
  router.use('/zonas', zonasRouter);
  router.use('/calibracion-largo', calibracionLargoRouter);
  router.use('/ppf', ppfRouter);
  router.use('/grupo-labores', grupoLaboresRouter);
  router.use('/labores', laboresRouter);
  router.use('/items-labor', itemsLaborRouter);
  router.use('/frutas', frutasRouter);
  router.use('/merma-rapida', mermaRapidaRouter);
  router.use('/companias', companiasRouter);
}

module.exports = routerApi;
