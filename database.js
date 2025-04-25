const mysql = require('mysql2/promise');
import Cliente from "../FitTrack/model/Cliente"

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

async function buscarCliente(usuario)
{
    const conexao = await conectarBD();
    const sql = "select * from cliente where email=? and senha=?;";
    const [usuarioEcontrado] = await conexao.query(sql,[usuario.email, usuario.senha]);
    return usuarioEcontrado && usuarioEcontrado.length>0 
        ? new Cliente(
            usuarioEcontrado[0].cod_cli,
            usuarioEcontrado[0].cod_cli
        ) 
        : {};
}

conectarBD()

module.exports = { buscarUsuario }
