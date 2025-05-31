const { AdministradorModel } = require("../model/AdministradorModel");
const { conectarBD } = require('../database');

class AdministradorDao {
    /**
     * Função que insere novo administrador no banco de dados
     * @param {AdministradorModel} admin 
     */
    async inserir(admin){
        const conexao = await conectarBD();

        const sql = ```
        insert into administrador(
            email_admin, 
            nome_admin, 
            foto_admin, 
            senha_admin
        ) values (?,?,?,?);```;

        const { insertId } = await conexao.query(sql, [
            admin.email,
            admin.nome,
            admin.foto,
            admin.senha
        ]);
        await conexao.end();

        if(!insertId){
            return false;
        }

        return new AdministradorModel(insertId, nome, email, senha, foto);
    }

    /**
     * Função que consulta no banco de dados um administrador por email
     * @param {string} email 
     * @returns {[AdministradorModel]} lista de AdminstradorModel
     */
    async consultarPorEmail(email){
        const conexao = await conectarBD();
        const sql = "SELECT * FROM administrador WHERE email = ?";
        const [ resultado ] = await conexao.query(sql, [email]);
        await conexao.end();
        
        return resultado.length > 0 ? await AdministradorModel.fromDatabase(result) : {};
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
     * 
     * @param {AdministradorModel} admin 
     */
    async atualizar(admin){
        const conexao = await conectarBD();
        const sql = ```
            update administrador 
                set nome_admin = ?,
                email_admin = ?,
                senha_admin = ?,
                foto_admin = ? 
            where cod_admin = ?;```;

        const [resultado] = await conexao.execute(sql, [
            admin.nome,
            admin.email,
            admin.senha,
            admin.foto,
            admin.codigo
        ]);

        await conexao.end();

        if(resultado.afectedRows > 0){
            return true;
        }

        return false;
    }
}

module.exports = { AdministradorDao };