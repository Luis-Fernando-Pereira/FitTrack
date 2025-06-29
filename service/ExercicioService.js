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

        if (!dados.titulo_exe || !dados.descricao_exe || !dados.duracao_exe) {
            throw new Error('Título, descrição e tempo estimado são obrigatórios');
        }

        if (dados.titulo_exe.length > 50) {
            throw new Error('O título do exercício não pode exceder 50 caracteres.');
        }

        const exercicioExistente = await this.exercicioDao.buscarPorTitulo(dados.titulo_exe);
        if (exercicioExistente) {
            throw new Error('Já existe um exercício com esse título.');
        }
        
        const exercicioModel = new ExercicioModel({
            titulo: dados.titulo_exe,
            descricao: dados.descricao_exe,
            tempoEstimado: dados.duracao_exe,
            video: dados.video_exe
        });

        const codigo = await this.exercicioDao.inserirExercicio(exercicioModel);
        exercicioModel.codigo = codigo;

        return exercicioModel;
    }

    async editarExercicio(codigo, dadosExercicio) {
        if (!dadosExercicio.titulo_exe || !dadosExercicio.descricao_exe || !dadosExercicio.duracao_exe) {
            throw new Error('Título, descrição e tempo estimado são obrigatórios');
        }

        if (dadosExercicio.titulo_exe.length > 50) {
            throw new Error('O título do exercício não pode exceder 50 caracteres.');
        }

        const dao = new ExercicioDao();
        
        const exercicioExistente = await dao.buscarPorTitulo(dadosExercicio.titulo_exe);
        if (exercicioExistente && exercicioExistente.codigo != codigo) {
            throw new Error('Já existe outro exercício com esse título.');
        }

        const exercicioModel = new ExercicioModel({
            codigo: codigo,
            titulo: dadosExercicio.titulo_exe,
            descricao: dadosExercicio.descricao_exe,
            tempoEstimado: dadosExercicio.duracao_exe,
            video: dadosExercicio.video_exe
        });

        return await dao.editarExercicio(exercicioModel);
    }

    async excluirExercicio(codigo) {
        const dao = new ExercicioDao();
       
        return await dao.excluirExercicio(codigo);
    }
}

module.exports = { ExercicioService };