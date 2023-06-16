const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, isAdminRole } = require('../middlewares');
const { 
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const routerCategory = Router();


//Obtener todas las categorias
routerCategory.get('/', obtenerCategorias);

//Obtener catergoria por id - publico
routerCategory.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

//Crear categoria - privado - cualquier persona con un token valido
routerCategory.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearCategoria);

//Actualizar - privado - cualquiera con token valido
routerCategory.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], actualizarCategoria);

routerCategory.delete('/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);


module.exports = {
    routerCategory
}
