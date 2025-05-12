const { AdministradorModel } = require("../model/AdministradorModel");

/**
 * Função que insere novo administrador no banco de dados
 * @param {AdministradorModel} admin 
 */
async function inserir(admin){
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

/**
 * Função que busca todos os administradores registrados no banco de dados
 * @returns array
 */
async function listarTodos() {
    const conexao = await global.banco.conectarDb();
    const sql = 'select * from administrador;';
    const { dadosEncontrados } = await conexao.query(sql);

    return dadosEncontrados;
}

module.exports = { AdministradorDao };