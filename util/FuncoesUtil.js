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

    static removeImagem(caminho){
        const fs = require('fs');
        const path = require('path');

        console.log(caminho);
        
        caminho = caminho.split('/');

        const caminhoImagem = path.join(__dirname, '..', 'public', caminho[1], caminho[2], caminho[3]);

        fs.unlink(caminhoImagem, (err) => {
            if (err) {
                console.error('Erro ao excluir imagem:', err);
            } else {
                // console.log('Imagem excluída com sucesso!');
            }
        });
    }
}

module.exports = { FuncoesUtil };