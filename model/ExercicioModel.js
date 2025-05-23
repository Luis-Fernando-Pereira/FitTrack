class ExercicioModel {
    constructor({ codigo, titulo, descricao, tempoEstimado, video }) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tempoEstimado = tempoEstimado;
        this.video = video;
    }
}

module.exports = { ExercicioModel };