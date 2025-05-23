const { ExercicioModel } = require('../model/ExercicioModel');
const { ExercicioDao } = require('../dao/ExercicioDao');

class ExercicioService {
    async listarExercicios() {
        const dao = new ExercicioDao();
        return await dao.listarExercicios();
    }

    async criarExercicio(dados, usuario) {
        if (!usuario || usuario.tipo !== 'administrador') {
            throw new Error('Apenas administradores podem criar exercícios');
        }

        if (!dados.titulo || !dados.descricao || !dados.tempoEstimado) {
            throw new Error('Título, descrição e tempo estimado são obrigatórios');
        }

        const dao = new ExercicioDao();
        const exercicioExistente = await dao.buscarPorTitulo(dados.titulo);

        if (exercicioExistente) {
            throw new Error('Já existe um exercício com esse título.');
        }

        const exercicio = new ExercicioModel(dados);
        const codigo = await dao.inserirExercicio(exercicio);
        exercicio.codigo = codigo;

        return exercicio;
    }
}

module.exports = { ExercicioService };