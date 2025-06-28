const { conectarBD } = require("../database");
const { ExercicioModel } = require("../model/ExercicioModel");
const { TreinoModel } = require("../model/TreinoModel");

class TreinoDao{
    constructor(){
        this.conexao = conectarBD();
    }
    
    /**
     * Função que busca os dados de um treino
     * @param {Number} id codigo de identificação de treino 
     
     * @returns objeto com - 
     * - {boolean} sucesso      - indica se a operação foi bem sucedida
     * - {Object} rows         - Array com linhas encontradas pela operação
     * - {string} mensagem      - Presente se nenhuma linha foi encontrada ou ocorreu erro
     * - {Error} erro           - Objeto de erro em caso de falha inesperada.
     */
    async buscarPorId(id) {
        try{
            const sql ='select * from lista_de_treinos_com_categorias WHERE cod_tre = ?;';
            const [ resultado ] = await (await this.conexao).query(sql, [ id ]);

            (await this.conexao).end();

            return resultado.length > 0 
                ? { sucesso: true,  rows: resultado }
                : { sucesso: false, mensagem: "Nenhum dado encontrado"};
        }catch(erro){
            return { sucesso: false, mensagem: "Houve algum erro durante execução", erro};
        }
    }

    /**
     * Função que busca por todos os registros de treinos no banco
     * de dados.
     * @returns objeto com - 
     * - {boolean} sucesso      - indica se a operação foi bem sucedida
     * - {Array<Object>} lista  - Array com linhas encontradas pela operação
     * - {string} mensagem      - Presente se nenhuma linha foi encontrada ou ocorreu erro
     * - {Error} erro           - Objeto de erro em caso de falha inesperada.
     */
    async listarTodos(){
        try{
            const sql ='select * from lista_de_treinos_com_categorias;';
            const [ resultado ] = await (await this.conexao).query(sql);
            (await this.conexao).end();
    
            return resultado.length > 0 
                ? { sucesso: true,  lista: resultado }
                : { sucesso: false, mensagem: "Nenhum dado encontrado"};
        }catch(erro){
            return { sucesso: false, mensagem: "Houve algum erro durante execução", erro};
        }
    }

    /**
     * Função que insere um novo treino no banco de dados
     * @param {TreinoModel} model retorna um objeto modelo de 
     * @returns objeto com - 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {Number} novoId campo com novo id registrado
     * - {string} mensagem - Presente se nenhuma linha foi inserida ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
     */
    async inserir(treino){    
        try{
            const sql = 'INSERT INTO treino(descricao_tre, titulo_tre) values (?,?);';
            const [ results ] = await (await this.conexao).query(sql, treino.toInsertArray());
            (await this.conexao).end();
            const { insertId } = results;
    
            if(!insertid){
                return {sucesso: false, mensagem: "Não foi possível inserir dados no banco de dados."};
            }
            return { sucesso: true, novoId: insertId};
        
        }catch(erro){
            return { sucesso: false, mensagem: "Houve algum erro durante execução", erro};
        }
        
    }

    /**
     * Função que atualiza registro de treino no banco de dados
     * @param {TreinoModel} treino 
     * @returns {Object} objeto com - 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {string} mensagem - Presente se nenhuma linha foi alterada ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
    */
    async atualizar(treino){
        try{
            const sql = 'UPDATE treino set descricao_tre = ?, titulo_tre = ? WHERE cod_tre = ?';
            const [ resultado ] = await (await this.conexao).query(sql, treino.toUpdateArray());
            (await this.conexao).end();
            const { affectedRows } = resultado;

            if(!affectedRows){
                return {sucesso: false, mensagem: "Nenhuma linha foi alterada."};
            }

            return {sucesso: true};
        }catch(erro){
            return {sucesso: false, mensagem: "Erro ao atualizar dados.", erro};
        }
    }

    /**
     * Função que deleta um registro de treino no banco de dados
     * @param {TreinoModel} treino 
     * @returns objeto com - 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {string} mensagem - Presente se nenhuma linha foi alterada ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
    */
    async deletar(treino){
        try{
            const sql = 'DELETE FROM treino WHERE cod_tre = ?';
            const [ resultado ] = await (await this.conexao).query(sql, [treino.codigo]);
            (await this.conexao).end();
            const { affectedRows } = resultado;

            if(!affectedRows){
                return {sucesso: false, mensagem: "Nenhuma linha foi deletada."};
            }

            return {sucesso: true};
        }catch(erro){
            return {sucesso: false, mensagem: "Falha ao deletar treino", erro};
        }
    }

    /**
     * 
     * @param {TreinoModel} treino 
     * @returns objeto com - 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {Array<Object>} novosIds - array com objetos obtendo ids inseridos.
     * - {string} mensagem - Presente se nenhuma linha foi inserida ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
    */
    async vincularExercicios(treino){
        try{
            const sql = "INSERT INTO treino_exercicio(treino, exercicio) VALUES ?";
            const [ resultado ] = await (await this.conexao).query(sql, treino.toInsertTreinoExercicioArray());
            (await this.conexao).end();
            const { affectedRows } = resultado;
            
            if(!affectedRows){
                return { sucesso: false, mensagem: "Falha ao inserir exercicios ao treino."};
            }

            const novosIds = [];
            treino.exercicios.forEach( 
                exercicio => novosIds.push({treino: treino.codigo, exercicio: exercicio.codigo}));

            return { sucesso: true, novosIds: novosIds};
        }catch(erro){
            return { sucesso: false, mensagem: "Erro inesperado ao inserir exercicios ao treino", erro};
        }
    }

    /**
     * 
     * @param {TreinoModel} treino 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {string} mensagem - Presente se nenhuma linha foi deletada ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
    */
    async removerVinculoExercicio(treino){
        try{
            const sql = "DELETE FROM treino_exercicio WHERE treino = ? AND exercicio in (?)";
            const [ resultado ] = await this.conexao.query(sql, [treino.codigo, treino.arrayCodigoExercicios()]);
            (await this.conexao).end();
            const { affectedRows } = resultado;

            return affectedRows > 0
            ? { sucesso: true }
            : { sucesso: false, mensagem: "Nenhuma linha deletada"}
        }catch(erro){
            return { sucesso: false, mensagem: "Erro inesperado ao deletar exercicio de treino", erro };
        }
    }
}

module.exports = { TreinoDao };
