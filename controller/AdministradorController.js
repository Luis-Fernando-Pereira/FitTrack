const { AdministradorService } = require("../service/AdministradorService");

/**
 * Função de controle que renderiza página de login de administrador
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.renderLogin = function (req, res, next){
    res.render('admin/index',
    {
        title: "Login",
        sucesso: null,
        mensagem: null,
        login: false            
    });
}

/**
 * Função de controle que renderiza página de dashboard de administrador
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.renderizarDashboard = function (req,res,next){
    res.render('admin/dashboard');
}

exports.renderizarAdministradores = async function (req, res, next){
    const service = new AdministradorService();
    const administradores = await service.consultarTodos();

    res.render('admin/administradores', { titulo: "Administradores", administradores });
}

exports.autenticar = async function(req, res, next){
    const {email, senha} = req.body;

    try{
        if(!emailSenhaPreenchidos(email, senha)){
            res.render('admin/index', {
                sucesso: false,
                mensagem: "Email e senha devem estar preenchidos!",
                login: true
            });
        }

        const service = new AdministradorService(); 

        if(!service.autenticar(email, senha)){
            res.render('admin/index', {
                sucesso: false,
                mensagem: "Email ou senha inválidos",
                login: true  
            })
        }
        
        res.redirect('dashboard');
    }catch(error){
        res.render('admin/index', {
            sucesso: false,
            mensagem: "Houve algum erro ao validar login",
            login: true
        });
    }    
}

/**
 * endpoint para criação de novo administrador
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.novoAdmin =  async function (req, res, next) {
    try{        
        let dados = req.body;
        const service = new AdministradorService();
        
        if (req.file) {
            dados.foto = '/images/usuarios/' + req.file.filename; // caminho relativo público
        } else {
            dados.foto = '/images/assets/avatar.png';
        }

        const novoAdmin = await service.criarNovoAdministrador(dados);

        if(!novoAdmin){
            return res.status(200).json({ sucesso: false, mensagem: "Dados de cadastro inválidos!"});
        }

        return res.status(201).json({ sucesso: true, mensagem: "Administrador cadastrado com sucesso!", usuario: novoAdmin });

    }catch(erro){
        return res.status(500).json({ sucesso: false, mensagem: "Falha ao cadastrar administrador!", erro: erro.message});
    }
}

exports.atualizarAdministrador = async function(req, res, next){
    try{
        let dados = req.body;
        const id = req.params.id;

        if (req.file) {
            dados.foto = '/images/usuarios/' + req.file.filename; // caminho relativo público
        }

        const service = new AdministradorService();
    
        const atualizado = await service.atualizarAdministrador(dados, id);

        if (atualizado) {
            return res.status(200).json({sucesso: true, mensagem: "Administrador atualizado com sucesso!" });
        } else {
            return res.status(400).json({ sucesso: false, mensagem: "Não foi possível atualizar o administrador." });
        }

    }catch(erro){
        return res.status(500).json({ sucesso: false, mensagem: "Erro inesperado ao atualzar registro", erro: erro.message});
    }
}

exports.deletarAdministrador = async function(req, res, next) {
    try{
        const id = req.params.id;
        const service = new AdministradorService();    
        const deletado = await service.deletarAdministrador(id);

        if (deletado) {
            return res.status(200).json({ sucesso: true, mensagem: "Administrador deletado com sucesso!"});
        } else {
            return res.status(400).json({ sucesso: false, mensagem: "Não foi possível deletar o administrador." });
        }

    }catch(erro){
        return res.status(500).json({ sucesso: false, mensagem: "Erro inesperado ao deletar administrador!", erro: erro.message });
    }
}

function emailSenhaPreenchidos(email, senha){
    if(!email || !senha){
        return false;
    }

    return true;
}