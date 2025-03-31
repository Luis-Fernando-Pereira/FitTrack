const mysql = require('mysql2/promise');

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

async function buscarUsuario(usuario)
{
    const conexao = await conectarBD();
    const sql = "select * from usuarios where email=? and senha=?;";
    const [usuarioEcontrado] = await conexao.query(sql,[usuario.email, usuario.senha]);
    return usuarioEcontrado && usuarioEcontrado.length>0 ? usuarioEcontrado[0] : {};
}


conectarBD()

module.exports = { buscarUsuario }
