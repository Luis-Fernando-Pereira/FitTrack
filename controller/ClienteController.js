const { ClienteModel } = require('../model/ClienteModel');
const { ClienteService } = require('../service/ClienteService'); 

exports.cadastrarCliente = async function (req, res, next){
    try{
        const body = req.body;
        const service = new ClienteService();
    
        const cliente = await service.novoCliente(body);
        
        res.redirect('/login').status(201).json(
            {
                sucesso: true,
                mensagem: "Usuário cadastrado com sucesso!",
                novoCliente: cliente
            }
        );
    }catch(error){
        res.redirect('/cadastro').status(200).json({
            sucesso: false,
            mensagem: error
        });
    }
}

exports.renderizarCadastroCliente = async function (req, res, next){    
    res.render('/cadastroCliente');
}

exports.renderizarLogin = async function (req, res, next){
    res.render('/login', {sucesso: req.body.sucesso, mensagem: req.body.mensagem});
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