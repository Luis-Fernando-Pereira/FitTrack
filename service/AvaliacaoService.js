const { AvaliacaoDao } = require('../dao/AvaliacaoDao');
const { AvaliacaoModel } = require('../model/AvaliacaoModel');

class AvaliacaoService {
    async avaliarTreino(cliente, treino, nota) {
        if (!cliente || !treino || typeof nota !== 'number') {
            throw new Error('Cliente, treino e nota são obrigatórios.');
        }
        if (nota < 0 || nota > 10) {
            throw new Error('A nota deve estar entre 0 e 10.');
        }
        const dao = new AvaliacaoDao();
        await dao.inserirOuAtualizar(new AvaliacaoModel({ cliente, treino, nota }));
    }

    async listarAvaliacoesPorTreino(treino) {
        const dao = new AvaliacaoDao();
        return await dao.buscarPorTreino(treino);
    }

    async buscarAvaliacaoDoCliente(cliente, treino) {
        const dao = new AvaliacaoDao();
        return await dao.buscarPorClienteETreino(cliente, treino);
    }

    async calcularMediaPorTreino(treino) {
        const dao = new AvaliacaoDao();
        return await dao.calcularMediaPorTreino(treino);
    }
}

module.exports = { AvaliacaoService };