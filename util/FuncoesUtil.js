const fs = require('fs');

class FuncoesUtil{
    static emailValido(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static existeArquivo(caminho){
        if(fs.existsSync(caminho))
        {
            return true;
        }
        return false
    }
}

module.exports = { FuncoesUtil };