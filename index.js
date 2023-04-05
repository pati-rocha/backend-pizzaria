const express = require('express')

const app = express()

app.listen(3333, () => {
    console.log("Servidor no ar!");
})

let pizzas = []

app.get('/pizzas', (request, response) => {

    const nameQuery = request.query.nameQuery

    const pizzasFiltered = pizzas.filter( pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))
    response.json(pizzasFiltered)
})