const express = require('express')
const app = express()

app.use(express.json())


let usuarios = []
let id = 1

// Cria usuarios
app.post('/usuarios', (req, resp) => {

    const {name, email, idade} = req.body

    console.log(name, email, idade)

    const user = {
        id: id++,
        name: name,
        email: email,
        idade: idade,
        criadoEm: new Date(),
    }

    usuarios.push(user)
    // push -> coloca algo dentro do array

    resp.status(200).send(user)
})

// Lista Usuarios
app.get('/usuarios', (req, resp) => {

    resp.status(200).send(usuarios)
})

// Busca Usuarios
app.get('/buscar/usuario/:id', (req, resp) => {

    const id = req.params.id

    const indexUsuario = usuarios.find(usuario => usuario.id == id)

    if(!indexUsuario){
        return resp.status(404).send({message: "Usuario não encontrado"})
    }

    resp.status(200).send(indexUsuario)
})

// Deleta Usuários
app.delete('/usuarios/:id', (req, resp) => {
    
    usuarios = usuarios.filter(u => u.id != req.params.id)
    resp.json({mensagem: 'usuário deletado!'})



})

app.listen(3333, () => {
    console.log("Servidor Rodando")
})