const express = require('express');
const router = express.Router();
const CategoriaController = require('../controller/CategoriaController');

router.get('/', CategoriaController.listarCategorias);
router.post('/', CategoriaController.criarCategoria);
router.put('/:id', CategoriaController.alterarCategoria); 
router.delete('/:id', CategoriaController.excluirCategoria);

module.exports = router;