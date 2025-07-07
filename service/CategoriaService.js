const { CategoriaModel } = require('../model/CategoriaModel');
const { CategoriaDao } = require('../dao/CategoriaDao');

class CategoriaService {
    async listarCategorias() {
        const dao = new CategoriaDao();
        return await dao.listarCategorias();
    }

    async criarCategoria(titulo) {
        if (!titulo || titulo.trim() === '') {
            throw new Error('Título da categoria não pode ser vazio');
        }

        const dao = new CategoriaDao();
        const categorias = await dao.listarCategorias();

        if (categorias.some(cat => cat.titulo.toLowerCase() === titulo.trim().toLowerCase())) {
            throw new Error('Já existe uma categoria com esse nome.');
        }

        const categoria = new CategoriaModel({ titulo });
        const codigo = await dao.inserirCategoria(categoria);
        categoria.codigo = codigo;

        return categoria;
    }

    async editarCategoria(novoTitulo, codigo) {
        if (!novoTitulo || novoTitulo.trim() === '') {
            throw new Error('Título da categoria não pode ser vazio');
        }

        const dao = new CategoriaDao();
        const categorias = await dao.buscaTodasCategorias();

        if (categorias.some(cat => cat.titulo.toLowerCase() === novoTitulo.trim().toLowerCase() && cat.codigo !== codigo)) {
            throw new Error('Já existe uma categoria com esse nome.');
        }

        return await dao.editarCategoria(novoTitulo, codigo);
    }
}

module.exports = { CategoriaService };