const { ClienteModel } = require("../model/ClienteModel");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FitTrack' });
});

router.get('/treinos', async function(req, res, next){
  res.render('treinos', {title: 'FitTrack' });  
})

router.post('/login', async function(req, res, next){
  var cliente = new ClienteModel({email: req.body.email, senha: req.body.senha})

  const usuario = await global.banco.buscarCliente(cliente);

  global.usuarioCodigo = usuario.id;
  global.usuarioEmail = usuario.email;
  res.redirect('/treinos');  
})

module.exports = router;
