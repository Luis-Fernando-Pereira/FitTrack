const express = require('express');
const router = express.Router();
const treinoController = require('../controller/TreinoController');

router.get('/listarTodos',                  treinoController.listarTreinos); 
router.post('/criar',                       treinoController.criarTreino);
router.post('/adicionarExercicio/:id',      treinoController.adicionarExercicios);
router.put('/atualizar/:id',                treinoController.atualizarTreino);
router.delete('/desvincularExercicio/:id',  treinoController.removerExercicios);

module.exports = router;