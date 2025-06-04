const express = require('express');
const router = express.Router();
const ClienteController = require('../controller/ClienteController');
const upload = require('../middleware/upload');
const { clienteLogado } = require('../middleware/usuario_logado');

router.get('/', ClienteController.renderizarLogin);
router.get('/cadastro', ClienteController.renderizarCadastroCliente);
router.get('/dashboard', clienteLogado ,ClienteController.renderizarDashboard);

router.post('/login', ClienteController.login);
router.post('/cadastrar', upload.single('foto'), ClienteController.cadastrarCliente);

module.exports = router;