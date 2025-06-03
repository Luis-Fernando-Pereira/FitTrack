const express = require('express');
const router = express.Router();
const ClienteController = require('../controller/ClienteController');
const upload = require('../middleware/upload');

router.get('/', ClienteController.renderizarLogin);
router.get('/login', ClienteController.login);
router.get('/cadastro', ClienteController.renderizarCadastroCliente);

router.post('/cadastrar', upload.single('foto'), ClienteController.cadastrarCliente);

module.exports = router;