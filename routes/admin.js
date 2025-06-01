const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const AdministradorController = require('../controller/AdministradorController');
const ClienteController = require('../controller/ClienteController');

router.get('/', AdministradorController.renderLogin);
router.get('/administradores', AdministradorController.renderizarAdministradores);
router.get('/dashboard', AdministradorController.renderizarDashboard);
router.get('/clientes', ClienteController.renderizarClientes);

router.post('/novoAdministrador', upload.single('foto'), AdministradorController.novoAdmin);
router.post('/login', AdministradorController.autenticar);

router.put('/atualizarAdministrador/:id', upload.single('foto'), AdministradorController.atualizarAdministrador);

router.delete('/deletarAdministrador/:id', AdministradorController.deletarAdministrador);

module.exports = router;