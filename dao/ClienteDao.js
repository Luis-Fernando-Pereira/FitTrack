const { ClienteModel } = require("../model/ClienteModel");

class ClienteDao {

    /**
     * Função que insere novo administrador no banco de dados
     * @param {ClienteModel} cliente 
     */
    async inserir(cliente){
        const conexao = await conectarBD();

        const sql = ```
        insert into cliente( 
            nome_cli, 
            email_cli, 
            senha_admin,
            idade_cli,
            peso_cli,
            sexo_cli,
            foto_cli
        ) values (?,?,?,?,?,?,?);```;

        const { insertId } = await conexao.query(sql, [
            cliente.nome,
            cliente.email,
            cliente.senha,
            cliente.idade,
            cliente.peso,
            cliente.sexo,
            cliente.foto
        ]);

        await conexao.end();

        if(!insertId){
            return false;
        }

        cliente.codigo = insertId;

        return cliente;
    }

    /**
     * Função que consulta no banco de dados um administrador por email
     * @param {string} email 
     * @returns {[AdministradorModel]} lista de AdminstradorModel
     */
    async consultarPorEmail(email){
        const conexao = await conectarBD();
        const sql = "SELECT * FROM cliente WHERE email_cli = ?";
        const [ resultado ] = await conexao.query(sql, [email]);
        await conexao.end();
        
        return resultado.length > 0 ? await ClienteModel.fromDatabase(resultado) : {};
    }

    /**
     * Função que busca todos os administradores registrados no banco de dados
     * @returns array
     */
    async listarTodos() {
        const conexao = await conectarBD();
        const sql = 'select * from cliente;';
        const [ resultado ] = await conexao.query(sql);
        await conexao.end();
        
        return resultado.length > 0 ? ClienteModel.fromDatabase(resultado) : {};
    }
    
    /**
     * 
     * @param {ClienteModel} admin 
     */
    async atualizar(cliente){
        const conexao = await conectarBD();
        const sql = ```
            update cliente 
                set nome_cli = ?,
                email_cli = ?,
                senha_cli = ?,
                idade_cli = ?,
                peso_cli = ?,
                sexo_cli = ?,
                foto_cli = ? 
            where cod_cli = ?;```;

        const [ resultado ] = await conexao.execute(sql, [
            cliente.nome,
            cliente.email,
            cliente.senha,
            cliente.idade,
            cliente.peso,
            cliente.sexo,
            cliente.foto,
            cliente.codigo
        ]);

        await conexao.end();

        if(resultado.afectedRows > 0){
            return true;
        }

        return false;
    }
}

module.exports = { ClienteDao };