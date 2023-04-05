const express = require('express')

const app = express()

app.listen(3333, () => {
    console.log("Servidor no ar!");
})

let pizzas = []

app.get('/pizzas', (request, response) => {
    response.json(pizzas)
})