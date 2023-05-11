const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
    if(!req.usuario) {
        res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es un administrador - No puede hacer esto`,
        });
    }
    next();
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if(!req.usuario) {
            res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }
        if(!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    tieneRole
}
