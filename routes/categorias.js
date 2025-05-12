const express = require('express');
const router = express.Router()

async function todasCategorias(){
    const dados = await global.banco.buscarCategorias();
}

module.exports = router;