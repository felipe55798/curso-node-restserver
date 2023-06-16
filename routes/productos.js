const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, isAdminRole } = require('../middlewares');
const { 
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const routerProduct = Router();


//Obtener todos los productos
routerProduct.get('/', obtenerProductos);

//Obtener producto por id - publico
routerProduct.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

//Crear producto - privado - cualquier persona con un token valido
routerProduct.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
], crearProducto);

//Actualizar producto - privado - cualquiera con token valido
routerProduct.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], actualizarProducto);

routerProduct.delete('/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);


module.exports = {
    routerProduct
}
