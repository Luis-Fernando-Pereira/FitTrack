class ClienteModel {
    /**
     * Gera um objeto que modela os dados de cliente
     * @param {{
     *  codigo: Number,
     *  nome: string,
     *  email: string,
     *  senha: string,
     *  sexo: string,
     *  peso: Number,
     *  foto: string
     * }}  
     */
    constructor({codigo,nome,email,senha,idade,sexo,peso,foto}){
        this.codigo = codigo
        this.nome = nome
        this.email = email
        this.senha = senha
        this.idade = idade
        this.sexo = sexo
        this.peso = peso
        this.foto = foto
    }

    static fromDatabase(dbResult) {
        let clienteList = [];

        dbResult.forEach(result => {
            clienteList.push(
                new AdministradorModel(
                    result.cod_cli,
                    result.nome_cli,
                    result.email_cli,
                    result.senha_cli,
                    result.peso_cli,
                    result.idade_cli,
                    result.sexo_cli,
                    result.foto_cli
                )
            )
        });

        return clienteList;
    }
}

module.exports = { ClienteModel };