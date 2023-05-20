const { response } = require("express");
const Usuario = require("../models/usuario.js");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt.js");
const { googleVerify } = require("../helpers/google-verify.js");
const login = async(req, res = response) => {
    const {correo, password} = req.body;

    try {
        const usuario = await Usuario.findOne({correo});
        //Verificar si el correo existe
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - correo',
            });
        }
        //Si el usuario está activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - estado: false',
            });
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - password',
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Hable con el administrador',
        });
    }
}

const googleSignIn = async(req, res = response) => {
    const {id_token} = req.body;
    try {
        const {nombre, img, correo} = await googleVerify(id_token);
        console.log()
        let usuario = await Usuario.findOne({correo});

        if(!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en DB
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador - Usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}
