const { ExercicioService } = require('../service/ExercicioService');

async function listarExercicios(req, res, next) {
    try {
        const service = new ExercicioService();
        const exercicios = await service.listarExercicios();
        res.json(exercicios);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

async function criarExercicio(req, res, next) {
    try {
        const usuario = req.usuario;
        const dados = req.body;
        const service = new ExercicioService();
        const exercicio = await service.criarExercicio(dados, usuario);
        res.status(201).json(exercicio);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

module.exports = { listarExercicios, criarExercicio };