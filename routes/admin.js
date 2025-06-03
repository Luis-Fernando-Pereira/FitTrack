const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { adminLogado } = require('../middleware/valida_admin');

const AdministradorController = require('../controller/AdministradorController');
const ClienteController = require('../controller/ClienteController');

// Módulo de administrador
router.get('/', AdministradorController.renderLogin);
router.get('/dashboard', adminLogado, AdministradorController.renderizarDashboard);
router.get('/administradores', adminLogado, AdministradorController.renderizarAdministradores);
router.get('/logout', adminLogado, AdministradorController.logout);
router.post('/login', AdministradorController.autenticar);
router.post('/novoAdministrador', adminLogado, upload.single('foto'), AdministradorController.novoAdmin);
router.put('/atualizarAdministrador/:id', adminLogado, upload.single('foto'), AdministradorController.atualizarAdministrador);
router.delete('/deletarAdministrador/:id', adminLogado, AdministradorController.deletarAdministrador);

//Módulo de cliente
router.get('/clientes', adminLogado, ClienteController.renderizarClientes);
router.post('/novoCliente', adminLogado, upload.single('foto'), ClienteController.cadastrarCliente);
router.put('/atualizarCliente/:id', adminLogado, upload.single('foto'), ClienteController.atualizarCliente);
router.delete('/deletarCliente/:id', adminLogado, ClienteController.deletarCliente);

module.exports = router;