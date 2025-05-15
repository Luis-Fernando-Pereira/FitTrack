const { AdministradorModel } = require("../model/AdministradorModel");
const { conectarBD } = require('../database');

class AdministradorDao {
    /**
     * Função que insere novo administrador no banco de dados
     * @param {AdministradorModel} admin 
     */
    async inserir(admin){
        const conexao = await global.banco;

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

        if(!insertId){
            return false;
        }

        return insertId;
    }

    async login(email, senha){
        try{
            const conexao = await conectarBD();
            const sql = 'SELECT * FROM administrador WHERE email_admin = ? AND senha_admin = ?';
            const resultado = conexao.query(sql,[email,senha]);

            return resultado[0] || null;
            
        }catch(error){
            console.log(error);
            return null;
        }
        
    }

    /**
     * Função que busca todos os administradores registrados no banco de dados
     * @returns array
     */
    async listarTodos() {
        try{
            const conexao = await global.banco.conectarDb();
            const sql = 'select * from administrador;';
            const { dadosEncontrados } = await conexao.query(sql);
            
            return dadosEncontrados;
            
        }catch(error){
            console.log(error);
            throw new Error(error);            
        }
    }
}

module.exports = { AdministradorDao };