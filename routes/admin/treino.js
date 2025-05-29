const express = require('express');
const router = express.Router();
const treinoController = require('../../controller/TreinoController');

router.get('/listarTodos',               treinoController.listarTreinos); 
router.post('/criar',                    treinoController.criarTreino);
router.post('/adicionarExercicio',       treinoController.adicionarExercicios);
router.put('/atualizar',                 treinoController.atualizarTreino);
router.delete('/desvincularExercicio',   treinoController.removerExercicios);
