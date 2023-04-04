
const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators');
const { getUsuarios, putUsuarios, postUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/', getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({min: 6}),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    check('correo', 'El valor del correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], postUsuarios);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRoleValido),
    validarCampos,
], putUsuarios);

router.delete('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], deleteUsuarios);

router.patch('/', patchUsuarios);

module.exports = {
    router
}
