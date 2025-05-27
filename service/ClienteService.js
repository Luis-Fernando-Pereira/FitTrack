const { ClienteDao } = require('../dao/ClienteDao'); 
const { ClienteModel } = require('../model/ClienteModel');
const { FuncoesUtil } = require('../util/FuncoesUtil');

class ClienteService {
    dao = new ClienteDao();

    async novoCliente(reqBody){
        let novoCliente = new ClienteModel({
            codigo: null, 
            nome: reqBody.nome,
            email: reqBody.email,
            senha: reqBody.senha,
            foto: reqBody.foto,
            peso: reqBody.peso,
            sexo: reqBody.sexo
        });
        
        await this.validaDadosCadastrais(novoCliente);
        
        novoCliente = await this.dao.inserir(novoCliente);

        if(!novoCliente){
            throw Error("Falha inesperada ao realizar cadastro");
        }

        return novoCliente;
    }

    async atualizarCliente(reqBody, id){
        if(!reqBody || !id){
            throw new Error("Dados obrigatórios devem estar preenchidos!");
        }

        const cliente = new ClienteModel({
            codigo: id, 
            nome: reqBody.nome,
            email: reqBody.email,
            senha: reqBody.senha,
            foto: reqBody.foto,
            peso: reqBody.peso,
            sexo: reqBody.sexo
        });

        this.validaDadosCadastrais(cliente);

        const sucesso = await this.dao.atualizar(cliente);

        return {
            sucesso: sucesso,
            cliente: await this.dao.buscarPorId(id)
        }
    }

    /**
     * 
     * @param {ClienteModel} cliente 
     */
    async validaDadosCadastrais(cliente){
        if(this.emailVazio(cliente.email)){
            throw new Error("Email deve estar preenchido!");
        }

        if(this.senhaVazia(cliente.senha)){
            throw new Error("Senha deve estar preenchida!");
        }
        
        if(this.nomeVazio(cliente.nome)){
            throw new Error("Nome deve estar preenchido!");
        }

        if(await this.emailCadastrado(cliente.email)){
            throw new Error("Email já cadastrado no sistema!");
        }

        if(!FuncoesUtil.emailValido(cliente.email)){
            throw new Error("Email inválido!");
        }
    }

    emailVazio(email){
        if(!email || email === ''){
            return true;
        }
        return false;
    }

    senhaVazia(senha){
        if(!senha || senha === ''){
            return true;
        }
        return false;
    }

    nomeVazio(nome){
        if(!nome || nome === ''){
            return true;
        }
        return false;
    }

    async emailCadastrado(email){
        const cliente = await this.dao.buscarPorEmail(email);

        if(cliente){
            return true;
        }

        return false;
    }
}

module.exports = { ClienteService };