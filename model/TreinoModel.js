class TreinoModel {
    /**
     * 
     * @param {Number} codigo 
     * @param {string} descricao 
     * @param {string} titulo 
     * @param {Array} exercicios 
     */
    constructor(codigo, descricao, titulo, exercicios){
        this.codigo = codigo;
        this.descricao = descricao;
        this.titulo = titulo;
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
}

module.exports = { TreinoModel };