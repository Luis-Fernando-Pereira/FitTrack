const { TreinoDao } = require('../dao/TreinoDao');
const { ExercicioModel } = require('../model/ExercicioModel');
const { TreinoModel } = require('../model/TreinoModel');

class TreinoService {
    /**
     * Função que vincula um exercicio a um treino
     * @param {Object} dados dados do corpo da requisição recebida
     * @param {Number} id id do treino vindo como parâmetro da requisição
     */
    async adicionarExercicios(dados, id){
        this.validarDadosVinculoExercicios(dados,id);
        const treino = this.novoTreino(dados);
        const dao = new TreinoDao();

        treino.codigo = id;

        const resultado = await dao.vincularExercicios(treino);
        this.validaResultadoDao(resultado);
    }

    /**
     * Função que desvincula um exercicio de um treino
     * @param {Object} dados dados do corpo da requisição recebida
     * @param {Number} id id do treino vindo como parâmetro da requisição
     */
    async removerExercicios(dados, id){
        this.validarDadosVinculoExercicios(dados, id);
        const treino = this.novoTreino(dados);
        const dao = new TreinoDao();
        
        treino.codigo = id;

        const resultado = await dao.removerVinculoExercicio(treino);
        this.validaResultadoDao(resultado);
    }

    /**
     * Função que valida e atualiza dados de treino
     * @param {Array} dados 
     * @param {Number} id 
     */
    async atualizarTreino(dados, id){
        this.validarDadosParaAtualizar(dados, id);
        const treino = this.novoTreino(dados);
        treino.codigo = id;

        const dao = new TreinoDao();

        const resultado = await dao.atualizar(treino);

        this.validaResultadoDao(resultado);
    }

    /**
     * Função que busca por todos os treinos no banco
     * de dados
     * @returns {Array<TreinoModel>} 
     */
    async listarTreinos(){
        const dao = new TreinoDao();
        const resultado = await dao.listarTodos();

        this.validaResultadoDao(resultado);
        const { lista } = resultado;

        return this.toArrayOfTreinoModel(lista);
    }

    /**
     * Função que aplica regras de negócio e cadastra treino e vincula 
     * exercicios ao mesmo
     * @param {Object<string,string,Array>} dados corpo da requisição com:
     * - {string} descricao - texto descrevendo treino
     * - {string} titulo    - texto com titulo do treino
     * - {Array} exercicios - Array contendo exercicios 
     * @returns {Promise<TreinoModel>}
     */
    async criarTreino(dados){
        this.validarDadosCadastro(dados);
        const dao = new TreinoDao();
        const treino = this.novoTreino(dados);
        const resultado = await dao.inserir(treino);
        
        this.validaResultadoDao(resultado);

        this.insereNovoIdAoTreino(treino, resultado.novoId);

        await this.vincularExercicios(treino);

        return treino;
    }

    async vincularExercicios(treino){
        const dao = new TreinoDao();
        const resultado = await dao.vincularExercicios(treino);

        this.validaResultadoDao(resultado);
    }

    insereNovoIdAoTreino(treino, novoId){
        treino.codigo = novoId; 
    }

    novoTreino(dados){
        return new TreinoModel(
            dados.codigo, 
            dados.descricao, 
            dados.titulo, 
            this.toArrayOfExercicioModel(dados.exercicios)
        );
    }

    /**
     * Função que converte array de objetos para 
     * array de TreinoModel
     * @param {Array} exercicios 
     * @returns {Array<TreinoModel>}
     */
    toArrayOfExercicioModel(exercicios){
        let listaExercicio = [];
        exercicios.forEach(exercicio => listaExercicio.push(
            ExercicioModel.exercicioModelFactory(exercicio)
        ));

        return listaExercicio;
    }

    /**
     * 
     * @param {Array<Object>} treinos 
     */
    toArrayOfTreinoModel(treinos){
        let listaDeTreinos = [];
        treinos.forEach( treino => listaDeTreinos.push(
            new TreinoModel(
                treino.codigo,
                treino.descricao,
                treino.titulo,
                treino.exercicios
            )
        ))
    }

    validaResultadoDao(resultado){
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

    validarDadosVinculoExercicios(dados, id){
        if(!this.idValido(id)){
            throw new Error("id inválido!");
        }

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


    validarDadosParaAtualizar(dados, id){        
        if(!this.idValido(id)){
            throw new Error("id inválido!");
        }

        if(!this.tituloValido(dados.titulo)){
            throw Error("Titulo inválido");
        }
        
        if(!this.descricaoValida(dados.descricao)){
            throw Error("Descrição inválida");
        }
    }

    /**
     * Verifica se id é válido
     * @param {Number} id 
     * @returns {boolean} true caso seja válido, false caso 
     * seja inválido
     */
    idValido(id){
        if(!id || id === "" || id === 0){
            return false;
        }
        return true;
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

module.exports = { TreinoService };