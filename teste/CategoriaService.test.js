const { CategoriaService } = require('../service/CategoriaService');
const { CategoriaModel } = require('../model/CategoriaModel');

jest.mock('../dao/CategoriaDao', () => {
    return {
        CategoriaDao: jest.fn().mockImplementation(() => ({
            listarCategorias: jest.fn().mockResolvedValue([
                { codigo: 1, titulo: 'Força' },
                { codigo: 2, titulo: 'Cardio' }
            ]),
            buscaTodasCategorias: jest.fn().mockResolvedValue([
                { codigo: 1, titulo: 'Força' },
                { codigo: 2, titulo: 'Cardio' }
            ]),
            inserirCategoria: jest.fn().mockResolvedValue(3),
            editarCategoria: jest.fn().mockResolvedValue(true)
        }))
    }
});

describe('CategoriaService', () => {
    let service;
    let usuarioAdmin = { tipo: 'administrador' };
    let usuarioComum = { tipo: 'comum' };

    beforeEach(() => {
        service = new CategoriaService();
    });

    test('CT-007: Deve cadastrar categoria com nome válido', async () => {
        const categoria = await service.criarCategoria('Funcional', usuarioAdmin);
        expect(categoria).toBeInstanceOf(CategoriaModel);
        expect(categoria.titulo).toBe('Funcional');
    });

    test('CT-007: Não deve cadastrar categoria sem nome', async () => {
        await expect(service.criarCategoria('', usuarioAdmin)).rejects.toThrow('Título da categoria não pode ser vazio');
    });

    test('CT-007: Não deve cadastrar categoria duplicada', async () => {
        await expect(service.criarCategoria('Força', usuarioAdmin)).rejects.toThrow('Já existe uma categoria com esse nome.');
    });

    test('CT-007: Não deve cadastrar categoria se não for administrador', async () => {
        await expect(service.criarCategoria('Nova', usuarioComum)).rejects.toThrow('Apenas administradores podem criar categorias');
    });

    test('CT-005: Deve editar categoria existente', async () => {
        const usuarioAdmin = { tipo: 'administrador' };
        const result = await service.editarCategoria('Nova Categoria', 1, usuarioAdmin);
        expect(result).toBe(true);
    });
});