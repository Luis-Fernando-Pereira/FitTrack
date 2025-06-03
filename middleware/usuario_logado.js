async function adminLogado(req, res, next) {
   if(!global.adminLogado){
        res.redirect('/admin');
    }
    next();
}

async function clienteLogado(req, res, next) {
    if(!global.clienteLogado){
        res.redirect('/');
    }
    next();
}

module.exports = { adminLogado, clienteLogado };