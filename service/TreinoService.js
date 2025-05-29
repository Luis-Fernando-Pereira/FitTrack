const { TreinoDao } = require('../dao/TreinoDao');
const { TreinoModel } = require('../model/TreinoModel');

class TreinoService {
    async criarTreino(dados){
        this.validaDadosParaCadastro(dados);
        const dao = new TreinoDao();
        const treino = new TreinoModel(null, dados.descricao, dados.titulo, dados.exercicios);
        const resultado = await dao.inserir(treino);
        
        this.validaRetorno(resultado);

        treino.codigo = resultado.novoId;

        await this.vincularExercicios(treino);

        return treino;
    }

    async vincularExercicios(treino){
        const dao = new TreinoDao();
        const resultado = await dao.vincularExercicios(treino);

        this.validaRetorno(resultado);
    }

    validaRetorno(resultado){
        if(!this.retornouSucesso(resultado)){
            if(this.possuiErro(resultado)){
                this.log(resultado.erro);
            }

            this.jogarErro(resultado.mensagem);
        }
    }
    
    
    validarDadosCadastro(dados){
        if(!this.listaExercicioValido(dados.exercicios)){
            throw Error("Treino deve ter pelo meno um exercício!");
        }
        
        if(!this.tituloValido(dados.titulo)){
            throw Error("Titulo inválido");
        }
        
        if(!this.descricaoValida(dados.descricao)){
            throw Error("Descrição inválida");
        }
    }

    jogarErro(mensagem){
        throw Error("Falha inesperada ao vincular exercicios ao treino: " + mensagem);
    }

    log(erro){
        console.log(erro);
    }

    retornouSucesso(resultado){
        if(!resultado.sucesso){
            return false;
        }
        return true;
    }

    possuiErro(resultado){
        if(!resultado.erro){
            return false;
        }
        return true;
    }
    
    listaExercicioValido(exercicios){
        if(exercicios.length < 1){
            return false;
        }
        return true;
    }

    descricaoValida(descricao){
        if(!descricao || descricao === ""){
            return false;
        }
        return true;
    }

    tituloValido(titulo){
        if(!titulo || titulo === ""){
            return false; 
        }
        return true;
    }
}