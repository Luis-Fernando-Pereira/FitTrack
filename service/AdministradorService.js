const { AdministradorDao } = require('../dao/AdministradorDao');
const { FuncoesUtil } = require('../util/FuncoesUtil');
const { AdministradorModel } = require('../model/AdministradorModel');

class AdministradorService {
    /**
     * Função que valida credenciais de administrador
     * @param {string} email 
     * @param {string} senha 
     * @returns 
     */
    async autenticar(email, senha){
        if(!email || !senha){
            return false;
        }
        
        if(FuncoesUtil.emailValido(email)){
            return false;
        }

        const dao = new AdministradorDao();  
        const admin = dao.consultarPorEmail(email);       

        if(!admin){
            return false;
        }

        if(senha !== admin.senha){
            return false;
        }

        return true; 
    }

    async criarNovoAdministrador(email, senha, nome, foto){        
        await this.validar(email,senha,foto);
        const dao = new AdministradorDao();

        if(this.existeAdministrador(email)){
            return false;
        }

        const resultado = await dao.inserir(new AdministradorModel({
            nome: nome,
            email: email,
            senha: senha,
            foto: foto
        }));

        return resultado;
    }

    async existeAdministrador(email){
        const dao = new AdministradorDao();
        const admin = dao.consultarPorEmail(email);

        if(admin.length > 0){
            return true;
        }

        return false;
    }

    /**
     * Função que busca por todos os administradores no banco de dados.
     * @returns {Array<AdministradorModel>} retorna uma lista de administradores. Se não 
     * houver administradores cadastrados no bano de dados, retorna falso.
     */
    async consultarTodos() {
        
        const dao = new AdministradorDao();
        const resultado = await dao.listarTodos();

        var administradores = AdministradorModel.fromDatabase(resultado);

        return administradores;
    }

    /**
     * Valida dados de email, senha e foto
     * @param {string} email email a ser inserido 
     * @param {string} senha senha a ser inserida
     * @param {string} foto caminho da imagem a ser inserida
     */
    async validar(email, senha, foto){
        this.validaEmail(email);
        this.validaSenha(senha);
        this.validaFoto(foto);
    }


    async validaEmail(email){
        if(!FuncoesUtil.emailValido(email)){
            throw Error("Email inválido");
        }
    }

    async validaSenha(senha){
        if(senha.length > 18){
            throw Error("Senha possui mais que 18 caracteres");
        }
    }

    async validaFoto(foto){
        if(!foto || foto.length == 0)
        {
            throw Error('Foto não encontrada');
        }
    }
}


module.exports = { AdministradorService };