const { ExercicioService } = require('../service/ExercicioService');
const { ExercicioModel } = require('../model/ExercicioModel');

jest.mock('../dao/ExercicioDao', () => {
    return {
        ExercicioDao: jest.fn().mockImplementation(() => ({
            listarExercicios: jest.fn().mockResolvedValue([
                { codigo: 1, titulo: 'Agachamento', descricao: 'Exercício de pernas', tempoEstimado: 10, video: null }
            ]),
            buscarPorTitulo: jest.fn().mockResolvedValue(null),
            inserirExercicio: jest.fn().mockResolvedValue(2)
        }))
    }
});

describe('ExercicioService', () => {
    let service;
    let usuarioAdmin = { tipo: 'administrador' };
    let usuarioComum = { tipo: 'comum' };

    beforeEach(() => {
        service = new ExercicioService();
    });

    test('CT-009: Deve cadastrar exercício com todos os campos obrigatórios', async () => {
        const dados = {
            titulo: 'Flexão',
            descricao: 'Exercício de peito',
            tempoEstimado: 5,
            video: 'video.mp4'
        };
        const exercicio = await service.criarExercicio(dados, usuarioAdmin);
        expect(exercicio).toBeInstanceOf(ExercicioModel);
        expect(exercicio.titulo).toBe('Flexão');
        expect(exercicio.descricao).toBe('Exercício de peito');
        expect(exercicio.tempoEstimado).toBe(5);
        expect(exercicio.video).toBe('video.mp4');
    });

    test('CT-009: Não deve cadastrar exercício sem campos obrigatórios', async () => {
        const dados = { titulo: '', descricao: '', tempoEstimado: null, video: null };
        await expect(service.criarExercicio(dados, usuarioAdmin)).rejects.toThrow('Título, descrição e tempo estimado são obrigatórios');
    });

    test('CT-009: Não deve cadastrar exercício duplicado', async () => {
        service.exercicioDao = { buscarPorTitulo: jest.fn().mockResolvedValue({ titulo: 'Flexão' }) };
        const dados = { titulo: 'Flexão', descricao: 'desc', tempoEstimado: 5, video: null };
        await expect(service.criarExercicio(dados, usuarioAdmin)).rejects.toThrow('Já existe um exercício com esse título.');
    });

    test('CT-009: Não deve cadastrar exercício se não for administrador', async () => {
        const dados = { titulo: 'Flexão', descricao: 'desc', tempoEstimado: 5, video: null };
        await expect(service.criarExercicio(dados, usuarioComum)).rejects.toThrow('Apenas administradores podem criar exercícios');
    });
});