const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

let pizzas = []
let solicitations = []

//listar todas as pizzas
app.get('/pizzas', (request, response) => {

    const nameQuery = request.query.name || ""

    const pizzasFiltered = pizzas.filter( pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))

    response.json(pizzasFiltered)   
})

//cadastrar pizza
app.post('/pizzas', (request, response) => {
    
    const { name, url, description, price, ingredients } = request.body

    const pizzaExist = pizzas.find( pizza => pizza.name == name)

    if( pizzaExist) {
        return response.status(401).json({ error: 'Pizza já encontra-se cadastrada!'})
    }

    const pizza = {
        id: uuidv4(),
        name,
        url,
        description,
        price,
        ingredients
    }
    pizzas.push(pizza)

    response.status(201).json(pizza)
})

//listar todos os pedidos
app.get('/solicitations', (request, response) => {
   
    response.json(solicitations)
})

//cadastrar pedido
app.post('/solicitations', (request, response) => {

    const {
        name_client,
        cpf_client,
        contact_client,
        address_client,
        payment_method,
        observations,
        pizzas
    } = request.body
    
    const solicitation = {
        id: uuidv4(),
        name_client,
        cpf_client,
        contact_client,
        address_client,
        payment_method,
        observations,
        pizzas,
        order: "EM PRODUÇÃO"        
    }
    
    solicitations.push(solicitation)
    response.status(201).json(solicitation)
})

app.listen(3333, () => {
    console.log("Servidor no ar!");
})