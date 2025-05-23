const { conectarBD } = require('../database');
const { CategoriaService } = require('../service/CategoriaService');
const { CategoriaModel } = require('../model/CategoriaModel');

jest.mock('../database');

test('Deve retornar categorias simuladas', async () => {
    const categoriasFalsas = [
        {cod_cat: 1, titulo_cat: 'Força'}, 
        {cod_cat: 2, titulo_cat: 'Estamina'}];
    
    const conexaoMock = {
      query: jest.fn().mockResolvedValue([categoriasFalsas])
    };


    conectarBD.mockResolvedValue(conexaoMock);

    const service = new CategoriaService();

    const resultado = await service.listarCategorias();

    expect(conexaoMock.query).toHaveBeenCalledWith('select cod_cat, titulo_cat from categoria;');
    expect(resultado).toEqual([
        new CategoriaModel({codigo: 1, titulo: 'Força'}),
        new CategoriaModel({codigo: 2, titulo: 'Estamina'})
    ]);
}); 