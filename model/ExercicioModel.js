class ExercicioModel {
    constructor({ codigo, titulo, descricao, tempoEstimado, video }) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tempoEstimado = tempoEstimado;
        this.video = video;
    }

    /**
     * 
     * @param {Object} object com:
     * - {Number|Null} codigo - codigo identificador de exercicio
     * - {string|Null} titulo - titulo do exercicio
     * - {string|Null} descricao - texto com breve desccricao do exercicio
     * - {Number|Null} tempoEstimado - duração do exercicio em minutos
     * - {string|Null} video - caminho que leva ao arquivo do video
     * 
     * @returns {ExercicioModel}
     */
    static exercicioModelFactory(object){
        return new ExercicioModel(
            object.codigo,
            object.titulo,
            object.descricao,
            object.tempoEstimado,
            object.video
        );
    }
}

module.exports = { ExercicioModel };