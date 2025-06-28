const { TreinoService } = require('../service/TreinoService');

exports.listarTreinos = async function (req, res, next) {
    try {
        const service = new TreinoService();
        const treinos = await service.listarTreinos();
        res.json(treinos);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

exports.criarTreino = async function (req, res, next) {
    try {
        const dados = req.body;
        const service = new TreinoService();
        const treino = await service.criarTreino(dados);
        res.status(201).json(treino);
    } catch (erro) {
        res.json({ sucesso: false, mensagem: erro.message });
    }
}

exports.atualizarTreino = async function (req, res, next) {
    try{
        const dados = req.body;
        const id = req.params.id;
        const service = new TreinoService();
        
        await service.atualizarTreino(dados,id);

        res.status(204);        
    } catch(erro){
        res.json({mensagem: erro});
    }
}

exports.removerExercicios = async function (req, res, next) {
    try{
        const dados = req.body;
        const id = req.params.id;
        const service = new TreinoService();

        await service.removerExercicios(dados, id);

        res.status(204);
    }catch(erro){
        res.json({mensagem: erro});
    }
}

exports.adicionarExercicios = async function (req, res, next) {
    try{
        const dados = req.body;
        const id    = req.params.id;
        const service = new TreinoService();

        await service.adicionarExercicios(dados, id);

        res.status(204);
    }catch(erro){
        return res.json({mensagem: erro});
    }
}

