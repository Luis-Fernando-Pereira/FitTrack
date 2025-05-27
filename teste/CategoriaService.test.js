const { conectarBD } = require('../database');
const { CategoriaService } = require('../service/CategoriaService');
const { CategoriaModel } = require('../model/CategoriaModel');

jest.mock('../database');

const categoriasFalsas = [
    {cod_cat: 1, titulo_cat: 'Força'}, 
    {cod_cat: 2, titulo_cat: 'Estamina'}];


const service = new CategoriaService();

describe('CT-007', () => {
    const conexaoMock = {
        query: jest.fn().mockImplementation(async (sql, [titulo]) => {
            const select = 'select';
            
            if(sql.toLowerCase().includes(select.toLowerCase().trim())){
                return [categoriasFalsas, undefined];
            }

            return [{insertId: categoriasFalsas.length + 1}, undefined];
        })
    }

    conectarBD.mockResolvedValue(conexaoMock);

    describe('criarCategoria', () => {

        test('Deve retornar instancia de CategoriaModel com novo id e titulo', async () => {
            const resultado = await service.criarCategoria('Pernas');
            expect(resultado).toBeInstanceOf(CategoriaModel);
            expect(resultado.codigo).toEqual(3);
            expect(resultado.titulo).toEqual('Pernas');
        });
    
        test('Deve retornar erro: Já existe uma categoria com esse nome', async () => {
            await expect(service.criarCategoria('Força')).rejects.toThrow('Já existe uma categoria com esse nome.');
        });
    
        test('Deve retornar erro: Título da categoria não pode ser vazio', async () => {
            await expect(service.criarCategoria('')).rejects.toThrow('Título da categoria não pode ser vazio');
        });
    });
    
});

describe('CT-019', () => {
    const conexaoMock = {
        query: jest.fn().mockResolvedValue([categoriasFalsas])
    };

    conectarBD.mockResolvedValue(conexaoMock);

    describe('listarCategorias', () => {
        test('Deve retornar Array com dados simulados', async () => {
            const resultado = await service.listarCategorias();
    
            expect(resultado).toBeInstanceOf(Array);
            expect(resultado[0]).toBeInstanceOf(CategoriaModel);
            expect(resultado).toEqual([
                new CategoriaModel({codigo: 1, titulo: 'Força'}),
                new CategoriaModel({codigo: 2, titulo: 'Estamina'})
            ]);
        });
    
        test('Deve retornar array vazia', async () => {
            conectarBD.mockResolvedValue({query: jest.fn().mockResolvedValue([[], undefined])});
    
            const resultado = await service.listarCategorias();
    
            expect(resultado).toBeInstanceOf(Array);
            expect(resultado.length).toEqual(0);
        });
    });
});


describe('CT-005', () => {
    const conexaoMock = {
        query: jest.fn().mockResolvedValue(async (sql, [titulo, codigo]) => {
            const select = 'select';
            
            if(sql.toLowerCase().includes(select.toLowerCase())){
                return [categoriasFalsas];
            }

            let retorno = {
                affectedRows: 1
            };

            if(!categorias.some(cat => cat.codigo === codigo)){
                retorno.affectedRows = 0;
            }

            return [retorno];
        })
    };

    conectarBD.mockResolvedValue(conexaoMock);
    
    describe('editarCategoria', () => {
        test('Deve retornar true', async () => {
            const resultado = await service.editarCategoria('Pernas', 2);
            expect(resultado).toEqual(true);
        });
        
        test('Deve retornar Nome de categoria não foi alterado!', async () => {
            await expect(service.editarCategoria('Força', 1)).rejects.toThrow('Nome de categoria não foi alterado');
        });
    
        test('Deve retornar Título da categoria não pode ser vazio!', async () => {
            await expect(service.editarCategoria('', 1)).rejects.toThrow('Título da categoria não pode ser vazio');
        });
    });
});

