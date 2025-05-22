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
    async inserir(model){
    
        const sql = 'INSERT INTO treino(descricao_tre, titulo_tre) values (?,?);';
        const { insertid } = await this.conexao.query(sql, model.toInsertArray());
        
        await this.conexao.end();

        if(!insertid){
            return false;
        }

        model.codigo = insertid;

        return model;
    }
}