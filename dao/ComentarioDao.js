const { conectarBD } = require('../database');
const { ComentarioModel } = require('../model/ComentarioModel');

class ComentarioDao {
    async inserirComentario(comentarioModel) {
        const conexao = await conectarBD();
        const [resultado] = await conexao.query(
            'insert into comentario (cliente, treino, texto_com, dhcadastro_com) values (?, ?, ?, ?)',
            [comentarioModel.cliente, comentarioModel.treino, comentarioModel.texto, comentarioModel.dataHora]
        );
        return resultado.insertId;
    }

    async listarPorTreino(idTreino) {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query(
            'select cod_com, cliente, treino, texto_com, dhcadastro_com from comentario where treino = ? order by dhcadastro_com desc',
            [idTreino]
        );
        return dadosEncontrados.map(row => new ComentarioModel({
            codigo: row.cod_com,
            cliente: row.cliente,
            treino: row.treino,
            texto: row.texto_com,
            dataHora: row.dhcadastro_com
        }));
    }
}

module.exports = { ComentarioDao };