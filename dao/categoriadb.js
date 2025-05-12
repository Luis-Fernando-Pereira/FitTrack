async function buscaTodasCategorias() {
    const conexao = await global.banco.conectarDb();
    const sql = 'select * from categoria;';
    const { dadosEncontrados } = await conexao.query(sql);

    if(dadosEncontrados.lenght > 0){
        dadosEncontrados.array.forEach(element => {
        
        });
    }

    return dadosEncontrados;
}

module.exports = { buscaTodasCategorias };
