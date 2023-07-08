const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const routerUpload = Router();

routerUpload.post('/', validarArchivoSubir, cargarArchivo);
routerUpload.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);

routerUpload.get('/:coleccion/:id', [
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = {
    routerUpload: routerUpload
}
