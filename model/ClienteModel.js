class ClienteModel {
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

    static doBancoDeDados(array) {
        if(array.length == 0) throw new Error("Nenhum dado na array")
        if(array.length > 1) return

        array.forEach(data => {
            
        });
    }
}

module.exports = { ClienteModel };