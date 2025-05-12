const express = require('express');
const router = express.Router();
const { Resposta } = require('../model/Resposta');


router.get('/listarTodos', async (req, res, next) => 
{
    const adminService = new AdministradorService();
    const administradores = adminService.listarTodos();
    
    res.render('admin/administradores', { administradores });
});

router.post('/novoAdmin', novoAdmin);


async function novoAdmin(req, res, next) {
    var resposta = criaResposta();

    const {email, senha, foto, nome} = req.body;

    try{        
        valdiarDados(email, senha, foto);

        const novoId = salvarAdmin(email, senha, foto, nome);

        (await resposta).mensagem = `Novo Administrador de código ${novoId} inserido com sucesso!`;
        (await resposta).sucesso = true;
    }catch(erro){
        (await resposta).mensagem(erro);
    }

    return res.json(resposta);
}

function valdiarDados(email, senha, foto){
    AdministradorService.validaEmail(email);
    AdministradorService.validaSenha(senha);
    AdministradorService.validaFoto(foto);
}

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

async function listarTodos() {        
    const adminDao = new AdministradorDao();

    const dados = await adminDao.buscarTodos();

    var listaAdmin = [];
    
    if(dados.length > 0){
        dados.forEach(element => {
            listaAdmin.push( new AdministradorModel(
                element.cod_admin,
                element.nome_admin,
                element.email_admin,
                element.senha_admin,
                element.foto_admin
            ));
        });
    }

    return listaAdmin;
}

function validaEmail(email){
    if(!FuncoesUtil.emailValido(email)){
        throw Error("Email inválido");
    }
}

function validaSenha(senha){
    if(senha.length > 18){
        throw Error("Senha possui mais que 18 caracteres");
    }
}

function validaFoto(foto){
    if(!FuncoesUtil.existeArquivo(foto))
    {
        throw Error('Foto não encontrada'); 
    }
}

module.exports = router;