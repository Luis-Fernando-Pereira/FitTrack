const { AdministradorService } = require("../service/AdministradorService");

/**
 * Função de controle que renderiza página de login de administrador
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function renderizaLogin(req, res, next){
    res.render('admin/index', {header: "FitTrack - Administrador", title: "Administrador" });
}

/**
 * Função de controle que renderiza página de dashboard de administrador
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function renderizarDashboard(req,res,next){
    res.render('admin/dashboard');
}

function renderizaAdministradores(req, res, next){
    const service = new AdministradorService();
    const administradores = service.listarTodos();
    res.render('admin/administradores', { administradores });
}

function validaLogin(req, res, next){
    const {email, senha} = req.body;
    const service = new AdministradorService();
    
    if(!service.validaCredenciais(email, senha)){
        return 
    }

    return res.redirect('/admin/dashboard');
}

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

module.exports = { renderizaLogin, renderizarDashboard, renderizaAdministradores, validaLogin };