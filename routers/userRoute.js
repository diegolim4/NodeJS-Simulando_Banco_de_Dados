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
const saveUsers = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

//Função com os métodos HTTP
const userRoute = (app) => {
    app.route('/users/:id?')

        .get((req, res) => {
            const users = getUsers()

            res.send({ users })
        })

        //Método POST para a criação de usuários
        .post((req, res) => {
            const users = getUsers()

            users.push(req.body)
            saveUsers(users)

            res.status(201).send('Usuário Criado')
        })

        //Método PUT para a atualização de usuários
        .put((req, res) => {
            const users = getUsers()

            saveUsers(users.map(user => {      //Usar a função map() para criar um novo obj atualizado, passando o id
                if (user.id == req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }return user
            }))
            
            res.status(200).send('Usuário Atulizado')
        })

}

module.exports = userRoute

