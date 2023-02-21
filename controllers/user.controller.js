const { response, request } = require('express');

const getUsuarios = (req = request, res = response) => {
    const { q, nombre = 'No name', apikey } = req.query;
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    });
}

const postUsuarios = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    });
}

const putUsuarios = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const patchUsuarios = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador',
    });
}

const deleteUsuarios = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador',
    });
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    patchUsuarios,
    deleteUsuarios
}
