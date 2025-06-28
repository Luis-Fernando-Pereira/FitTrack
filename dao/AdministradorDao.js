const { AdministradorModel } = require("../model/AdministradorModel");
const { conectarBD } = require('../database');

class AdministradorDao {
    /**
     * Função que insere novo administrador no banco de dados
     * @param {AdministradorModel} admin 
     */
    async inserir(admin){
        const conexao = await conectarBD();

        const sql = 'insert into administrador(email_admin, nome_admin, foto_admin, senha_admin) values (?,?,?,?);';

        const [resultado] = await conexao.query(sql, [
            admin.email,
            admin.nome,
            admin.foto,
            admin.senha
        ]);

        return resultado.insertId ? resultado.insertId : false;
    }

    /**
     * Função que consulta no banco de dados um administrador por email
     * @param {string} email 
     * @returns {[AdministradorModel]} lista de AdminstradorModel
     */
    async consultarPorEmail(email){
        const conexao = await conectarBD();
        const sql = "SELECT * FROM administrador WHERE email_admin = ?";
        const [ resultado ] = await conexao.query(sql, [email]);
        
        return resultado;
    }

    /**
     * Função que busca todos os administradores registrados no banco de dados
     * @returns array
     */
    async listarTodos() {
        const conexao = await conectarBD();
        const sql = 'select * from administrador;';
        const [dadosEncontrados] = await conexao.query(sql);
        
        return dadosEncontrados;
    }

    /**
     * Função que busca todos os administradores registrados no banco de dados
     * @returns array
     */
    async buscarPorId(id) {
        const conexao = await conectarBD();
        const sql = 'select * from administrador where cod_admin = ?;';
        const [dadosEncontrados] = await conexao.query(sql, [id]);
        
        conexao.end();

        return dadosEncontrados.length > 0 ? dadosEncontrados : false;
    }
    
    /**
     * 
     * @param {AdministradorModel} admin 
     */
    async atualizar(admin){
        const conexao = await conectarBD();
        const sql = 'UPDATE administrador SET nome_admin = ?, email_admin = ?, senha_admin = ?, foto_admin = ? WHERE cod_admin = ?;';

        const [resultado] = await conexao.query(sql, [
            admin.nome,
            admin.email,
            admin.senha,
            admin.foto,
            admin.codigo
        ]);
        conexao.end();

        if(resultado.affectedRows > 0){
            return true;
        }

        return false;
    }

    /**
     * Metodo que realiza operação de deletar no banco de dados 
     * @param {Number} codigo codigo do administrador a ser deletado
     * @returns {boolean}
     */
    async deletar(codigo){
        const conexao = await conectarBD();
        const sql = 'DELETE FROM administrador WHERE cod_admin = ?;';
        
        const [resultado] = await conexao.query(sql, [codigo]);
        conexao.end();

        return resultado.affectedRows > 0 ? true : false;
    }
}

module.exports = { AdministradorDao };