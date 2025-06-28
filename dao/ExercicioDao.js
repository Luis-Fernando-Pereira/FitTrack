const { conectarBD } = require('../database');
const { ExercicioModel } = require('../model/ExercicioModel');

class ExercicioDao {
    async listarExercicios() {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query('select cod_exe, titulo_exe, descricao_exe, duracao_exe, video_exe from exercicio;');

        conexao.end();
        return dadosEncontrados.map(row => new ExercicioModel({
            codigo: row.cod_exe,
            titulo: row.titulo_exe,
            descricao: row.descricao_exe,
            tempoEstimado: row.duracao_exe,
            video: row.video_exe
        }));
    }

    async inserirExercicio(exercicioModel) {
        const conexao = await conectarBD();
        const [resultado] = await conexao.query('insert into exercicio (titulo_exe, descricao_exe, duracao_exe, video_exe) values (?, ?, ?, ?)',
            [
                exercicioModel.titulo,
                exercicioModel.descricao,
                exercicioModel.tempoEstimado,
                exercicioModel.video
            ]
        );
        conexao.end();

        return resultado.insertId;
    }

    async buscarPorTitulo(titulo) {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query('select cod_exe, titulo_exe, descricao_exe, duracao_exe, video_exe from exercicio where titulo_exe = ?;', [titulo]);

        conexao.end();
        return dadosEncontrados.length > 0 ? new ExercicioModel({
            codigo: dadosEncontrados[0].cod_exe,
            titulo: dadosEncontrados[0].titulo_exe,
            descricao: dadosEncontrados[0].descricao_exe,
            tempoEstimado: dadosEncontrados[0].duracao_exe,
            video: dadosEncontrados[0].video_exe
        }) : null;
    }
}

module.exports = { ExercicioDao };