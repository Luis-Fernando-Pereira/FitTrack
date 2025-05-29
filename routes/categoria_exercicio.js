const express = require('express');
const router = express.Router();
const {
    associarExercicioCategoria,
    desassociarExercicioCategoria,
    listarExerciciosPorCategoria,
    listarCategoriasPorExercicio
} = require('../controller/CategoriaExercicioController');

router.post('/categoria-exercicio', associarExercicioCategoria);

router.delete('/categoria-exercicio', desassociarExercicioCategoria);

router.get('/categoria-exercicio/categoria/:categoria', listarExerciciosPorCategoria);

router.get('/categoria-exercicio/exercicio/:exercicio', listarCategoriasPorExercicio);

module.exports = router;