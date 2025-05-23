const express = require('express');
const router = express.Router();
const { listarExercicios, criarExercicio } = require('../controller/ExercicioController');

router.get('/exercicios', listarExercicios);
router.post('/exercicios', criarExercicio);

module.exports = router;