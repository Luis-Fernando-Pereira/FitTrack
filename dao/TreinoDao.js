const { conectarBD } = require("../database");
const { TreinoModel } = require("../model/TreinoModel");

class TreinoDao{
    constructor(){
        this.conexao = conectarBD();
    }

    async listarTodos(){
        const sql = ```
            SELECT * FROM treino;
        ```;
    }

    /**
     * Função que insere um novo treino no banco de dados
     * @param {TreinoModel} model retorna um objeto modelo de 
     * treino em caso de sucesso. Caso contrário, retorna false. 
     */
    async inserir(treino){
    
        const sql = 'INSERT INTO treino(descricao_tre, titulo_tre) values (?,?);';
        const { insertid } = await this.conexao.query(sql, treino.toInsertArray());
        
        await this.conexao.end();

        if(!insertid){
            return false;
        }

        model.codigo = insertid;

        return model;
    }

    /**
     * Função que atualiza registro de treino no banco de dados
     * @param {TreinoModel} treino 
     */
    async atualizar(treino){
        const sql = 'UPDATE treino set descricao_tre = ?, titulo_tre = ? WHERE cod_tre = ?';
        const { affectedRows } = await this.conexao.query(sql, treino.toUpdateArray());

        await this.conexao.end();

        if(!affectedRows || affectedRows.length < 1){
            return false;
        }

        return true;
    }

    /**
     * Função que deleta um registro de treino no banco de dados
     * @param {TreinoModel} treino 
     */
    async deletar(treino){
        const sql = 'DELETE FROM treino WERE cod_tre = ?';
        const { affectedRows } = await this.conexao.query(sql, [treino.codigo]);

        if(!affectedRows || affectedRows.length < 1 || affectedRows.length > 1){
            return false;
        }

        return true;
    }
}