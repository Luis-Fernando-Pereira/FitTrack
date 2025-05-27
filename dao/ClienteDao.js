const { conectarBD } = require("../database");
const { ClienteModel } = require("../model/ClienteModel");

class ClienteDao {

    /**
     * Função que insere novo administrador no banco de dados
     * @param {ClienteModel} cliente 
     */
    async inserir(cliente){
        const conexao = await conectarBD

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

        const { insertId } = await conexao.query(sql, cliente.toInsertArray());

        await conexao.end();

        if(!insertId){
            return false;
        }

        cliente.codigo = insertId;

        return cliente;
    }

    /**
     * Função que consulta no banco de dados um cliente por email
     * @param {string} email 
     * @returns {[AdministradorModel]} lista de AdminstradorModel
     */
    async buscarPorEmail(email){
        const conexao = await conectarBD();
        const sql = "SELECT * FROM cliente WHERE email_cli = ?";
        const [ resultado ] = await conexao.query(sql, [email]);
        await conexao.end();

        if(resultado.length > 0){
            const clientes = await ClienteModel.fromDatabase(resultado)
        } else {
            return {};
        }
        
        return clientes[0];
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
     * @param {ClienteModel} cliente 
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

        const [ resultado ] = await conexao.query(sql, cliente.toUpdateArray());

        if(resultado.afectedRows > 0){
            return true;
        }

        return false;
    }

    async buscarPorId(id){
        const sql = 'SELECT * FROM cliente WHERE cod_cli = ?';
        const conexao = await conectarBD();
        const [ resultado ] = await conexao.query(sql, [id]);

        const cliente = [];
        
        if(resultado.length > 0){
            cliente = ClienteModel.fromDatabase(resultado);            
        }

        return cliente[0];
    }
}

module.exports = { ClienteDao };