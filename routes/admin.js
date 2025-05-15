const express = require('express');
const router = express.Router();
const AdministradorController = require('../controller/AdministradorController');

//Rotas
router.get('/', AdministradorController.renderizaLogin);
router.get('/administradores', AdministradorController.renderizaAdministradores);
router.get('/dashboard', AdministradorController.renderizarDashboard);

router.post('/novoAdministrador', AdministradorController.novoAdministrador);
router.post('/login', AdministradorController.validaLogin);


//Funções auxiliares



async function criaResposta(){
    return new Resposta(false,"");
}

async function salvarAdmin(email,senha,foto,nome){
    const admin = new AdministradorDao();

    return await admin.inserir(new AdministradorModel({
        nome: nome,
        email: email,
        senha: senha,
        foto: foto
    }));
}


module.exports = router;