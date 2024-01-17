const express = require('express');
const route = express.Router();
const indexcontroller = require('./src/controllers/indexcontroller');
const logincontroller = require('./src/controllers/logincontroller');
const metacontroller = require('./src/controllers/metacontroller');
const { somenteUsuarios } = require('./src/middlewares/middleware');

route.get('/', indexcontroller.index);
route.get('/registrarMeta', somenteUsuarios, metacontroller.cadastroMetas)
route.get('/dashboard', somenteUsuarios, logincontroller.dashboardInicial)
route.get('/dashboard/:id', somenteUsuarios, logincontroller.dashboard)

route.post('/registrar', logincontroller.registrar);
route.post('/logar', somenteUsuarios, logincontroller.logar);
route.post('/registrarMeta', somenteUsuarios, metacontroller.registrarMeta);

module.exports = route;