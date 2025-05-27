const express = require('express');
const router = express.Router();
const controller = require('../controller/ClienteController');

router.post('/novoCliente', controller.cadastrarCliente);
router.get('/cadastrar', controller.renderizarCadastroCliente);


module.exports = router;