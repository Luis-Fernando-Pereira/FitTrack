const mysql = require('./mysql2/promise');
import Cliente from "./model/ClienteModel.js"

async function conectarBD()
{
    
    if(global.conexao && global.conexao.state !== 'disconnected') 
    {
        return global.conexao;
    }
    
    const conexao = await mysql.createConnection({
        host     : 'localhost',
        port     :  3306,
        user     : 'root',
        password : 'root',
        database : 'fittrack' 
    });

    return conexao;
}

conectarBD();

module.exports = { conectarBD };
