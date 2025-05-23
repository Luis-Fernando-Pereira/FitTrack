const { ExercicioModel } = require('../model/ExercicioModel');
const { ExercicioDao } = require('../dao/ExercicioDao');

class ExercicioService {
    constructor() {
        this.exercicioDao = new ExercicioDao();
    }

    async listarExercicios() {
        return await this.exercicioDao.listarExercicios();
    }

    async criarExercicio(dados, usuario) {
        if (!usuario || usuario.tipo !== 'administrador') {
            throw new Error('Apenas administradores podem criar exercícios');
        }

        if (!dados.titulo || !dados.descricao || !dados.tempoEstimado) {
            throw new Error('Título, descrição e tempo estimado são obrigatórios');
        }

        const exercicioExistente = await this.exercicioDao.buscarPorTitulo(dados.titulo);

        if (exercicioExistente) {
            throw new Error('Já existe um exercício com esse título.');
        }

        const exercicio = new ExercicioModel(dados);
        const codigo = await this.exercicioDao.inserirExercicio(exercicio);
        exercicio.codigo = codigo;

        return exercicio;
    }
}

module.exports = { ExercicioService };