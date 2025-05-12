const express = require('express');
const router = express.router();

async function todasCategorias(){
    const dados = await global.banco.buscarCategorias();
}