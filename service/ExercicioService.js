const { ExercicioModel } = require('../model/ExercicioModel');
const { ExercicioDao } = require('../dao/ExercicioDao');
const { FuncoesUtil } = require('../util/FuncoesUtil');

class ExercicioService {
    constructor() {
        this.dao = new ExercicioDao();
    }

    async iniciarExercicio(treinoMarcadoId, exercicioId, clienteId){
        const dao = new ExercicioDao();
        const sucesso = dao.iniciarExercicio(
            treinoMarcadoId,
            exercicioId,
            clienteId,
            FuncoesUtil.dataHoraAtual()
        );

        if(!sucesso){
            throw new Error('não foi possivel iniciar exercicio!');
        }
    }

    async finalizarExercicio(treinoMarcadoId, exercicioId, peso, repeticoes){
        const dao = new ExercicioDao();
        const sucesso = dao.finalizarExercicio(
            treinoMarcadoId,
            exercicioId,
            FuncoesUtil.dataHoraAtual(),
            peso,
            repeticoes
        );
        
        if(!sucesso){
            throw new Error('não foi possivel iniciar exercicio!');
        }
    }

    async listarExercicios() {
        return await this.dao.listarExercicios();
    }

    async buscarPorId(id) {
        return await this.dao.buscarPorId(id);
    }

    async criarExercicio(dados, usuario) {
        if (!usuario || usuario.tipo !== 'administrador') {
            throw new Error('Apenas administradores podem criar exercícios');
        }

        if (!dados.titulo || !dados.descricao || !dados.tempoEstimado) {
            throw new Error('Título, descrição e tempo estimado são obrigatórios');
        }

        const exercicioExistente = await this.dao.buscarPorTitulo(dados.titulo);

        if (exercicioExistente) {
            throw new Error('Já existe um exercício com esse título.');
        }

        const exercicio = new ExercicioModel(dados);
        const codigo = await this.dao.inserirExercicio(exercicio);
        exercicio.codigo = codigo;

        return exercicio;
    }
}

module.exports = { ExercicioService };