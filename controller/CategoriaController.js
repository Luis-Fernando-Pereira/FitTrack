const { CategoriaService } = require('../service/CategoriaService');

async function listarCategorias(req, res, next) {
    try {
        const service = new CategoriaService();
        const categorias = await service.listarCategorias();
        res.json(categorias);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

async function criarCategoria(req, res, next) {
    try {
        const { titulo } = req.body;
        const usuario = req.usuario;
        const service = new CategoriaService();
        const categoria = await service.criarCategoria(titulo, usuario);
        res.status(201).json(categoria);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

module.exports = { listarCategorias, criarCategoria };