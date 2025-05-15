const { FuncoesUtil } = require('../util/FuncoesUtil');

class AdministradorService {
    /**
     * Função que valida credenciais de administrador
     * @param {string} email 
     * @param {string} senha 
     * @returns 
     */
    async validaCredenciais(email, senha){
        if(!email || !senha){
            throw new Error("Parâmetros devem estar preenchidos");
        }
        
        if(FuncoesUtil.emailValido(email)){
            return false;
        }

        const dao = new AdministradorDao();        

        if(!dao.login(email, senha)){
            return false;
        }

        return true; 
    }

    /**
     * Função que busca por todos os administradores no banco de dados.
     * @returns {array|false} retorna uma lista de administradores. Se não 
     * houver administradores cadastrados no bano de dados, retorna falso.
     */
    async listarTodos() {        
        const dao = new AdministradorDao();
        const resultado = await dao.listarTodos();

        if(resultado.length == 0){
            return false;
        }

        var administradores = [];
        resultado.forEach(element => {
            administradores.push( new AdministradorModel(
                element.cod_admin,
                element.nome_admin,
                element.email_admin,
                element.senha_admin,
                element.foto_admin
            ));
        });
        
        return administradores;
    }

    /**
     * 
     * @param {*} email 
     * @param {*} senha 
     * @param {*} foto 
     */
    async valdiarDados(email, senha, foto){
        AdministradorService.validaEmail(email);
        AdministradorService.validaSenha(senha);
        AdministradorService.validaFoto(foto);
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
        if(!FuncoesUtil.existeArquivo(foto))
        {
            throw Error('Foto não encontrada'); 
        }
    }
}


module.exports = { AdministradorService };