
const { Router } = require('express');
const { getUsuarios, putUsuarios, postUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/user.controller');
const router = Router();

router.get('/', getUsuarios);

router.post('/', postUsuarios);

router.put('/:id', putUsuarios);

router.delete('/', deleteUsuarios);

router.patch('/', patchUsuarios);

module.exports = {
    router
}
