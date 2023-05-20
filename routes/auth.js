const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const routerAuth = Router();

routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

routerAuth.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = {
    routerAuth
}
