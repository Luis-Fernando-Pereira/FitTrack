const { ClienteDao } = require('../dao/ClienteDao'); 
const { ClienteModel } = require('../model/ClienteModel');
const { FuncoesUtil } = require('../util/FuncoesUtil');

class ClienteService {
    async novoCliente(dados){
        let novoCliente = new ClienteModel(
            null, 
            dados.nome,
            dados.email,
            dados.senha,
            dados.idade,
            dados.sexo,
            dados.peso,
            dados.foto,
        );

        try{
            await this.validaDadosCadastrais(novoCliente);
        
            const dao = new ClienteDao();
            novoCliente.codigo = await dao.inserir(novoCliente);

            if(!novoCliente.codigo){
                FuncoesUtil.removerFoto(novoCliente.foto);
                throw Error("Falha inesperada ao realizar cadastro");
            }

            return novoCliente;

        }catch(erro){
            FuncoesUtil.removerFoto(novoCliente.foto);
            throw new Error(erro.message);
        }        
    }

    async listarTodos(){
        const dao = new ClienteDao();
        const clientes = await ClienteModel.fromDatabase(await dao.listarTodos());

        return clientes;
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
        const dao = new ClienteDao();
        const cliente = await dao.buscarPorEmail(email);
        if(cliente){
            return true;
        }
        return false;
    }
}

module.exports = { ClienteService };