const express = require('express');
const router = express.Router();
const AdministradorController = require('../controller/AdministradorController');

//Rotas
router.get('/',                         AdministradorController.renderLogin);
router.get('/administradores',          AdministradorController.renderizarAdministradores);
router.get('/dashboard',                AdministradorController.renderizarDashboard);
router.post('/novoAdministrador',       AdministradorController.novoAdmin);
router.post('/login',                   AdministradorController.autenticar);

module.exports = router;