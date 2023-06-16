const {Router} = require('express');
const { buscar } = require('../controllers/buscar');

const routerBuscar = Router();

routerBuscar.get('/:coleccion/:termino', buscar);

module.exports = {
    routerBuscar
}
