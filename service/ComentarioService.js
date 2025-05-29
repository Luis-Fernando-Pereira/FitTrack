const { ComentarioDao } = require('../dao/ComentarioDao');
const { ComentarioModel } = require('../model/ComentarioModel');

class ComentarioService {
    async criarComentario(cliente, treino, texto) {
        if (!cliente) {
            throw new Error('Usuário não autenticado.');
        }
        if (!treino) {
            throw new Error('Treino não informado.');
        }
        if (!texto || texto.trim() === '') {
            throw new Error('Comentário não pode ser vazio.');
        }
        const comentario = new ComentarioModel({
            cliente,
            treino,
            texto,
            dataHora: new Date()
        });
        const dao = new ComentarioDao();
        const codigo = await dao.inserirComentario(comentario);
        comentario.codigo = codigo;
        return comentario;
    }

    async listarComentariosPorTreino(idTreino) {
        const dao = new ComentarioDao();
        return await dao.listarPorTreino(idTreino);
    }
}

module.exports = { ComentarioService };