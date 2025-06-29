const mysql = require('mysql2/promise');

async function conectarBD()
{    
    const conexao = await mysql.createConnection({
        host     : 'localhost',
        port     :  3306,
        user     : 'root',
        password : '',
        database : 'fittrack' 
    });

    return conexao;
}

module.exports = { conectarBD };
