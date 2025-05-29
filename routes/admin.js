const express = require('express');
const router = express.Router();
const AdministradorController = require('../controller/AdministradorController');
const treinoController = require('../controller/TreinoController');

//Rotas
router.get('/', AdministradorController.login);
router.get('/administradores', AdministradorController.renderizarAdministradores);
router.get('/dashboard', AdministradorController.renderizarDashboard);

router.post('/novoAdministrador', AdministradorController.novoAdmin);
router.post('/login', AdministradorController.autenticar);
router.post('/criarTreino', treinoController.criarTreino);


module.exports = router;