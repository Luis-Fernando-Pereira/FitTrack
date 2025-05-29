const { ComentarioService } = require('../service/ComentarioService');

async function criarComentario(req, res, next) {
    try {
        const cliente = req.usuario?.codigo;
        const { treino, texto } = req.body;
        const service = new ComentarioService();
        const comentario = await service.criarComentario(cliente, treino, texto);
        res.status(201).json(comentario);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function listarComentariosPorTreino(req, res, next) {
    try {
        const { idTreino } = req.params;
        const service = new ComentarioService();
        const comentarios = await service.listarComentariosPorTreino(idTreino);
        res.json(comentarios);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = { criarComentario, listarComentariosPorTreino };