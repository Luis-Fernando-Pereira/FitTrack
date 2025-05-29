const express = require('express');
const router = express.Router();
const { criarComentario, listarComentariosPorTreino } = require('../controller/ComentarioController');

router.post('/comentarios', criarComentario);

router.get('/comentarios/treino/:idTreino', listarComentariosPorTreino);

module.exports = router;