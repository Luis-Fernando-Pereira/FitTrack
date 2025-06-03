const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const AdministradorController = require('../controller/AdministradorController');
const ClienteController = require('../controller/ClienteController');

// Módulo de administrador
router.get('/', AdministradorController.renderLogin);
router.get('/dashboard', AdministradorController.renderizarDashboard);
router.get('/administradores', AdministradorController.renderizarAdministradores);
router.post('/login', AdministradorController.autenticar);
router.post('/novoAdministrador', upload.single('foto'), AdministradorController.novoAdmin);
router.put('/atualizarAdministrador/:id', upload.single('foto'), AdministradorController.atualizarAdministrador);
router.delete('/deletarAdministrador/:id', AdministradorController.deletarAdministrador);

//Módulo de cliente
router.get('/clientes', ClienteController.renderizarClientes);
router.post('/novoCliente', upload.single('foto'), ClienteController.cadastrarCliente);
router.put('/atualizarCliente/:id', upload.single('foto'), ClienteController.atualizarCliente);
router.delete('/deletarCliente/:id', ClienteController.deletarCliente);

module.exports = router;