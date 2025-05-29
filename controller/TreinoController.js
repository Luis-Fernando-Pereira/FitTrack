
exports.listarTreinos = async function (req, res, next) {
    try {
        const service = new TreinoService();
        const treinos = await service.listarTreinos();
        res.json(exercicios);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

exports.criarTreino = async function (req, res, next) {
    try {
        const dados = req.body;
        const service = new TreinoService();
        const treino = await service.criarTreino(dados);
        res.status(201).json({sucesso: true, treino: treino});
    } catch (erro) {
        res.json({ sucesso: false, mensagem: erro.message });
    }
}