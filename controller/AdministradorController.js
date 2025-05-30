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

exports.renderizarAdministradores = function (req, res, next){
    const service = new AdministradorService();
    const administradores = service.consultarTodos();

    res.render('admin/administradores', { administradores });
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
        const {email, senha, foto, nome} = req.body;
        if(!email || !senha || !nome){
            res.render('admin/novo-admin', {
                sucesso: false,
                mensagem: "Campos obrigatórios devem estar preenchidos!",
                cadastro: true
            });
        }

        const service = new AdministradorService();
        
        if(service.existeAdministrador(email)){
            res.render('admin/novo-admin', {
                sucesso: false,
                mensagem: "Este email já está cadastrado!",
                cadastro: true
            });
        }

        const novoAdmin = service.criarNovoAdministrador(email, senha, foto, nome);

        if(!novoAdmin){
            res.render('admin/novo-admin', {
                
            })
        }

    }catch(erro){
        res.render('/admin/novo-administrador', {
            sucesso: false,
            mensagem: "Erro ao inserir novo administrador"
        });
    }
}

function emailSenhaPreenchidos(email, senha){
    if(!email || !senha){
        return false;
    }

    return true;
}