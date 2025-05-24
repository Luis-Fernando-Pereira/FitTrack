const { conectarBD } = require('../database');
const { CategoriaService } = require('../service/CategoriaService');
const { CategoriaModel } = require('../model/CategoriaModel');

jest.mock('../database');

let categoriasFalsas = [
    {cod_cat: 1, titulo_cat: 'Força'}, 
    {cod_cat: 2, titulo_cat: 'Estamina'}];


const service = new CategoriaService();

test('Deve retornar categorias simuladas', async () => {

    const conexaoMock = {
        query: jest.fn().mockResolvedValue([categoriasFalsas])
    };

    conectarBD.mockResolvedValue(conexaoMock);

    const resultado = await service.listarCategorias();

    expect(conexaoMock.query).toHaveBeenCalledWith('select cod_cat, titulo_cat from categoria;');
    expect(resultado).toEqual([
        new CategoriaModel({codigo: 1, titulo: 'Força'}),
        new CategoriaModel({codigo: 2, titulo: 'Estamina'})
    ]);
});

test('CT-007: cadastro de categoria com titulo', async () => {

    const conexaoMock = {
        query: jest.fn().mockResolvedValue(async (sql, [titulo]) => {
            const select = 'select';
            
            if(sql.toLowerCase().includes(select.toLowerCase())){
                return [categoriasFalsas];
            }

            categoriasFalsas.push(categoriasFalsas.length + 1, titulo);

            return [{
                fieldCount: 0,
                affectedRows: 1,
                insertId: categoriasFalsas.length,
                serverStatus: 2,
                warningCount: 0,
                message: '',
                protocol41: true,
                changedRows: 0
            }]
        })
    };

    conectarBD.mockResolvedValue(conexaoMock);

    const resultado = await service.criarCategoria('Pernas');

    expect(resultado).toEqual(new CategoriaModel(3, 'Pernas'));
    expect(categoriasFalsas.length).toEqual(3);
});