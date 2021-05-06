const fs = require('fs')                //fs (file system) é um modulo nativo do node para lidar com arquivos
const { join } = require('path')

// Vamos simular um banco de dados, armazendado os dados em arq. json
const filePath = join(__dirname, 'users.json')    // users.json é o nome do arquivo onde vamos salvar

//Criando um método para pegar os aquivos
const getUsers = () => {
    const data = fs.existsSync(filePath)   // Aqui vamos verificar se o arquivo existe
        ? fs.readFileSync(filePath)       // Se ele existi vai retornar o arquivo de maneira assíncrona
        : []                             //Se não existi vai retorna um obj vazio
       
    try {
        return JSON.parse(data) //retorna os arquivo JSON
    } catch (error) {  //retorna vazio se tiver algum problema na leitura do arquivo
        return []
    }
}


// Método para salvar
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

//Função com os métodos HTTP
const userRoute = (app) => {
    app.route('/users/:id?')
        
        .get((req, res) => {
            const users = getUsers()

            res.send({ users })
        })   
        
}

module.exports = userRoute

