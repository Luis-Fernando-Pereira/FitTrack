async function buscarCliente(cliente)
{
    const conexao = await conectarBD();
    const sql = "select * from cliente where email=? and senha=?;";
    const [usuarioEcontrado] = await conexao.query(sql,[usuario.email, usuario.senha]);
    return usuarioEcontrado && usuarioEcontrado.length>0 
        ? new Cliente(
            usuarioEcontrado[0].cod_cli,
            usuarioEcontrado[0].nome_cli,
            usuarioEcontrado[0].email_cli,
            usuarioEcontrado[0].senha_cli,
            usuarioEcontrado[0].idade_cli,
            usuarioEcontrado[0].sexo_cli,
            usuarioEcontrado[0].peso_cli,
            usuarioEcontrado[0].foto_cli,
        ) 
        : {};
}

async function buscarCategorias(){
    const conexao = await conectarBD();
    const sql = "select * from categoria;";
    const [categoriasEncontradas] = await conexao.query(sql);
    
    return categoriasEncontradas;
}

module.exports = {buscarCategorias, buscarCliente };