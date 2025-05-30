const express = require('express');
const router = express.Router();
const {
    avaliarTreino,
    listarAvaliacoesPorTreino,
    buscarAvaliacaoDoCliente,
    calcularMediaPorTreino
} = require('../controller/AvaliacaoController');

router.post('/avaliacao', avaliarTreino);

router.get('/avaliacao/treino/:treino', listarAvaliacoesPorTreino);

router.get('/avaliacao/cliente/:cliente/treino/:treino', buscarAvaliacaoDoCliente);

router.get('/avaliacao/treino/:treino/media', calcularMediaPorTreino);

module.exports = router;