const { conectarBD } = require('../database');
const { CategoriaModel } = require('../model/CategoriaModel');

class CategoriaDao {
    async listarCategorias() {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query('select cod_cat, titulo_cat from categoria;');

        return dadosEncontrados.map(row => new CategoriaModel({
            codigo: row.cod_cat,
            titulo: row.titulo_cat
        }));
    }

    async inserirCategoria(categoriaModel) {
        const conexao = await conectarBD();
        const [resultado] = await conexao.query('insert into categoria (titulo_cat) values (?)', [categoriaModel.titulo]);

        return resultado.insertId;
    }

    async buscarPorTitulo(titulo) {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query('select cod_cat, titulo_cat from categoria where titulo_cat = ?;', [titulo]);

        return dadosEncontrados.length > 0 ? new CategoriaModel({
            codigo: dadosEncontrados[0].cod_cat,
            titulo: dadosEncontrados[0].titulo_cat
        }) : null;
    }
}

module.exports = { CategoriaDao };