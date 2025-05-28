const { ClienteService } = require('../service/ClienteService');
const { ClienteModel } = require('../model/ClienteModel');

jest.mock('../dao/ClienteDao', () => {
    return {
        ClienteDao: jest.fn().mockImplementation(() => ({
            inserir: jest.fn().mockImplementation(cliente => {
                cliente.codigo = 1;
                return Promise.resolve(cliente);
            }),
            buscarPorEmail: jest.fn().mockResolvedValue(null)
        }))
    }
});

jest.mock('../util/FuncoesUtil', () => ({
    FuncoesUtil: {
        emailValido: jest.fn().mockReturnValue(true)
    }
}));

describe('ClienteService', () => {
    let service;

    beforeEach(() => {
        service = new ClienteService();
    });

    test('Deve cadastrar cliente com nome, email e senha', async () => {
        const dados = {
            nome: 'João',
            email: 'joao@email.com',
            senha: 'senha123',
            sexo: 'M',
            idade: 22,
            peso: 70
        };
        const cliente = await service.novoCliente(dados);
        expect(cliente).toBeInstanceOf(ClienteModel);
        expect(cliente.nome).toBe('João');
        expect(cliente.email).toBe('joao@email.com');
        expect(cliente.codigo).toBe(1);
    });

    test('Deve cadastrar cliente com todos os campos obrigatórios', async () => {
        const dados = {
            nome: 'Maria',
            email: 'maria@email.com',
            senha: 'senha123',
            sexo: 'F',
            idade: 25,
            peso: 60,
            foto: 'foto.jpg'
        };
        const cliente = await service.novoCliente(dados);
        expect(cliente).toBeInstanceOf(ClienteModel);
        expect(cliente.nome).toBe('Maria');
        expect(cliente.sexo).toBe('F');
        expect(cliente.idade).toBe(25);
        expect(cliente.peso).toBe(60);
        expect(cliente.foto).toBe('foto.jpg');
    });

    test('Não deve cadastrar cliente sem campos obrigatórios', async () => {
        const dados = { nome: '', email: '', senha: '', sexo: '', idade: null, peso: null };
        await expect(service.novoCliente(dados)).rejects.toThrow();
    });

    test('Não deve cadastrar cliente com email já cadastrado', async () => {
        service.dao.buscarPorEmail = jest.fn().mockResolvedValue(new ClienteModel({
            codigo: 2, nome: 'Outro', email: 'joao@email.com', senha: '123', sexo: 'M', idade: 20, peso: 70
        }));
        const dados = {
            nome: 'João',
            email: 'joao@email.com',
            senha: 'senha123',
            sexo: 'M',
            idade: 22,
            peso: 70
        };
        await expect(service.novoCliente(dados)).rejects.toThrow('Email já cadastrado no sistema!');
    });
});