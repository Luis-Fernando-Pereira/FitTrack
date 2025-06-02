const { ClienteModel } = require('../model/ClienteModel');
const { ClienteService } = require('../service/ClienteService'); 

exports.deletarCliente = async function (req, res, next) {
    try{
        const id = req.params.id;
        const service = new ClienteService();    
        const deletado = await service.deletarCliente(id);

        if (deletado) {
            return res.status(200).json({ sucesso: true, mensagem: "Administrador deletado com sucesso!"});
        } else {
            return res.status(400).json({ sucesso: false, mensagem: "Não foi possível deletar o cliente." });
        }

    }catch(erro){
        console.log(erro)
        return res.status(500).json({ sucesso: false, mensagem: "Erro inesperado ao deletar cliente!", erro: erro.message });
    }
}

exports.cadastrarCliente = async function (req, res, next){
    try{
        let dados = req.body;
        
        if (req.file) {
            dados.foto = '/images/usuarios/' + req.file.filename; // caminho relativo público
        } else {
            dados.foto = '/images/assets/avatar.png';
        }

        const service = new ClienteService();    
        const cliente = await service.novoCliente(dados);
        
        return res.status(201).json({ 
            sucesso: true, 
            mensagem: "Cadastro realizado com sucesso!", 
            cliente 
        });
    }catch(error){
        res.status(200).json({
            sucesso: false,
            mensagem: error.message
        });
    }
}

exports.renderizarCadastroCliente = async function (req, res, next){    
    res.render('novo-cliente', { 
        titulo: "Cadastro",
        sucesso: null,
        message: null,
    });
}

exports.renderizarLogin = async function (req, res, next){
    res.render('index', { 
        titulo: "Login",
        sucesso: false,
        message: null,
    });
}

exports.renderizarClientes = async function (req, res, next){
    const service = new ClienteService();
    const clientes = await service.listarTodos();
    
    res.render('admin/clientes', { titulo: "Clientes", clientes });
}

exports.atualizarCliente = async function (req, res, next){

    const body = req.body;
    const id = req.params.id;

    try{
        const service = new ClienteService();
        const {sucesso, cliente} = await service.atualizarCliente(body, id);

        if(!sucesso){
            res.status(200).json({
                sucesso: sucesso,
                mensagem: "Falha ao atualizar dados!",
                cliente: cliente 
            });    
        }

        res.status(200).json({
            sucesso: sucesso,
            mensagem: "Dados atualizados com sucesso!",
            cliente: cliente 
        });
        

    }catch(error){
        const service = new ClienteService();
        const cliente = await service.buscarClientePorId(id);

        res.status(200).json({
            sucesso: false,
            mensagem: error,
            cliente: cliente
        });
    }
}