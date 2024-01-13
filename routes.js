const express = require('express');
const route = express.Router();
const indexcontroller = require('./src/controllers/indexcontroller');
const logincontroller = require('./src/controllers/logincontroller');
const { somenteUsuarios } = require('./src/middlewares/middleware');

route.get('/', indexcontroller.index);

route.post('/registrar', logincontroller.registrar);
route.post('/logar', somenteUsuarios, logincontroller.logar);

module.exports = route;