const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

app.listen(3333, () => {
    console.log("Servidor no ar!");
})

let pizzas = []

app.get('/pizzas', (request, response) => {
    response.json(pizzas)
})

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