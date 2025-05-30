const { conectarBD } = require('../database');
const { AvaliacaoModel } = require('../model/AvaliacaoModel');

class AvaliacaoDao {
    async inserirOuAtualizar(avaliacaoModel) {
        const conexao = await conectarBD();
        const [resultado] = await conexao.query(
            'insert into avaliacao (cliente, treino, nota) values (?, ?, ?) on duplicate key update nota = ?',
            [avaliacaoModel.cliente, avaliacaoModel.treino, avaliacaoModel.nota, avaliacaoModel.nota]
        );
        return resultado;
    }

    async buscarPorTreino(treino) {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query(
            'select cliente, treino, nota from avaliacao where treino = ?',
            [treino]
        );
        return dadosEncontrados.map(row => new AvaliacaoModel(row));
    }

    async buscarPorClienteETreino(cliente, treino) {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query(
            'select cliente, treino, nota from avaliacao where cliente = ? and treino = ?',
            [cliente, treino]
        );
        return dadosEncontrados.length > 0 ? new AvaliacaoModel(dadosEncontrados[0]) : null;
    }

    async calcularMediaPorTreino(treino) {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query(
            'select avg(nota) as media from avaliacao where treino = ?',
            [treino]
        );
        return dadosEncontrados[0].media;
    }
}

module.exports = { AvaliacaoDao };