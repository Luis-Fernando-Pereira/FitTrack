const { AdministradorService } = require('../service/AdministradorService');
const { AdministradorModel } = require('../model/AdministradorModel');

const mock = [
    {
        codigo: 1,
        nome: "Ana Souza",
        email: "ana.souza@email.com",
        senha: "senha123",
        foto: "ana.jpg"
    },
    {
        codigo: 2,
        nome: "Carlos Lima",
        email: "carlos.lima@email.com",
        senha: "abc12345",
        foto: "carlos.jpg"
    }
];

jest.mock('../dao/AdministradorDao', () => {
    return {
        AdministradorDao: jest.fn().mockImplementation(() => ({
            listarTodos: jest.fn().mockResolvedValue(mock),
            inserir: jest.fn().mockImplementation((adminModel) => {
                adminModel.codigo = Math.floor(Math.random() * 1000) + 1;
                return Promise.resolve(adminModel);
            }),
            consultarPorEmail: jest.fn().mockResolvedValue([])
        }))
    }
});

describe('AdministradorService', () => {
    let service;

    beforeEach(() => {
        service = new AdministradorService();
    });

    test('Deve retornar lista de AdministradorModel', async () => {
        const resultado = await service.consultarTodos();
        expect(Array.isArray(resultado)).toBe(true);
        expect(resultado[0]).toBeInstanceOf(AdministradorModel);
    });

    test('Deve cadastrar administrador com dados obrigatórios', async () => {
        const resultado = await service.criarNovoAdministrador(
            'admin@email.com',
            'senha123',
            'Admin',
            'foto.jpg'
        );
        expect(resultado).toBeInstanceOf(AdministradorModel);
        expect(resultado).toHaveProperty('codigo');
        expect(typeof resultado.codigo).toBe('number');
    });
});