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

        if(!insertId){
            return false;
        }

        return new AdministradorModel(insertId, nome, email, senha, foto);
    }

    async consultarPorEmail(email){
        const conexao = await conectarBD();
        const sql = "SELECT * FROM administrador WHERE email = ?";
        const [ resultado ] = conexao.query(sql, [email]);
        
        return resultado;
    }

    async consultaAdminPorEmailSenha(email, senha){
        const conexao = await conectarBD();
        const sql = 'SELECT * FROM administrador WHERE email_admin = ? AND senha_admin = ?';
        const [ adminEncontrado ] = conexao.query(sql,[email,senha]);

        return  adminEncontrado && adminEncontrado.length > 0 ? adminEncontrado[0]:{};        
    }

    /**
     * Função que busca todos os administradores registrados no banco de dados
     * @returns array
     */
    async listarTodos() {
        try{
            const conexao = await conectarBD();
            const sql = 'select * from administrador;';
            const [dadosEncontrados] = await conexao.query(sql);
            
            return dadosEncontrados;
            
        }catch(error){
            console.log(error);
            throw new Error(error);            
        }
    }
}

module.exports = { AdministradorDao };