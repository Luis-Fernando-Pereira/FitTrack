const { ExercicioModel } = require('../model/ExercicioModel');

class TreinoModel {
    /**
     * 
     * @param {Number} codigo código identificador de treino
     * @param {string} descricao Breve descrição do treino
     * @param {string} titulo titulo do treino
     * @param {Array<ExercicioModel>} exercicios array de ExercicioModel
     */
    constructor(codigo, descricao, titulo, exercicios){
        this.codigo = codigo;
        this.descricao = descricao;
        this.titulo = titulo;
        this.exercicios = exercicios;//alterar depois para testes
    }

    /**
     * Função que gera uma array com apenas código dos exercícios do treino
     * @returns {Array<Number>} array com apenas código dos 
     * exercicios do treino. 
     */
    arrayCodigoExercicios(){
        let listaCodigoExercicios = [];
        this.exercicios.forEach(exercicio => listaCodigoExercicios.push(exercicio.codigo));
        return listaCodigoExercicios;
    }

    /**
     * Função para converter propriedades do objeto para uma array
     * @returns {Array} retorna dados da objeto em um formato 
     * que pode ser utilizado para inserir dados no banco de 
     * dados 
     */
    toInsertArray(){
        return [
            this.descricao,
            this.titulo
        ];
    }

    /**
     * Função para converter propriedades do objeto para uma array
     * @returns {Array} retorna dados do objeto em um formato 
     * que pode ser utilizado para atualizar um registro do 
     * banco de dados
     */
    toUpdateArray(){
        return [
            this.descricao,
            this.titulo,
            this.codigo
        ];
    }

    toInsertTreinoExercicioArray(){
        const exercicios_treino = []; 
        this.exercicios.forEach(exercicio => exercicios_treino.push(
            [this.codigo, exercicio.codigo]));
        return [exercicios_treino];
    }
}

module.exports = { TreinoModel };