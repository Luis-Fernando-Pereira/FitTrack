const express = require('express');
const router = express.Router();
const { listarCategorias, criarCategoria } = require('../controller/CategoriaController');

router.get('/categorias', listarCategorias);
router.post('/categorias', criarCategoria);

module.exports = router;