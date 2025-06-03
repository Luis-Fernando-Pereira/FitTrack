const { ClienteDao } = require('../dao/ClienteDao'); 
const { ClienteModel } = require('../model/ClienteModel');
const { FuncoesUtil } = require('../util/FuncoesUtil');

class ClienteService {
    async deletarCliente(codigo){
        const dao = new ClienteDao();
        const [ cliente ] = ClienteModel.fromDatabase(await dao.buscarPorId(codigo)); 
        
        if(!cliente){
            throw new Error('Cliente não encontrado!');
        }

        const deletado = await dao.deletar(cliente);

        if(!deletado){
            return false;
        }

        FuncoesUtil.removerFoto(cliente.foto_admin);

        return true;
    }

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

    async atualizarCliente(dados, id){
        const cliente = new ClienteModel(
            id,
            dados.nome,
            dados.email,
            dados.senha,
            dados.idade,
            dados.sexo,
            dados.peso,
            dados.foto
        );

        this.validarDadosParaAtualizar(cliente);

        const dao = new ClienteDao();
        
        const [dadosAntigos] = await ClienteModel.fromDatabase(await dao.buscarPorId(cliente.codigo));
        const atualizado = await dao.atualizar(cliente);
        
        if(!atualizado){
            FuncoesUtil.removerFoto(adminModel.foto);
        } else {
            FuncoesUtil.removerFoto(dadosAntigos.foto_admin)
        }

        return atualizado;
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

    /**
     * 
     * @param {ClienteModel} cliente 
     */
    validarDadosParaAtualizar(cliente){
        if(this.emailVazio(cliente.email)){
            throw new Error("Email deve estar preenchido!");
        }

        if(this.senhaVazia(cliente.senha)){
            throw new Error("Senha deve estar preenchida!");
        }
        
        if(this.nomeVazio(cliente.nome)){
            throw new Error("Nome deve estar preenchido!");
        }

        if(!FuncoesUtil.emailValido(cliente.email)){
            throw new Error("Email inválido!");
        }

        if(this.senhaInvalida(cliente.senha)){
            throw new Error("Senha ultrapassou máximo de caracteres!");
        }
    }

    senhaInvalida(senha){
        if(senha.length > 18){
            return true
        }
        return false;
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