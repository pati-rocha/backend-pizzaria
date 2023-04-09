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

//atualizar pizza
app.put('/pizzas/:id',(request, response) => {

    const pizza = pizzas.find( pizza => pizza.id == request.params.id)
    if(!pizza) {
        return response.status(404).json({error: "Desculpe, não encontramos seu produto! "})
    }

    const newPizzas = pizzas.map( pizza => {
        if (pizza.id == request.params.id) {
            pizza.name = request.body.name
            pizza.url = request.body.url
            pizza.description = request.body.description
            pizza.price = request.body.price
            pizza.ingredients = request.body.ingredients
        }
        return pizza        
    })

    pizzas = [... newPizzas]
    response.json(pizzas)
})

//atualizar preço da pizza
app.patch('/pizzas/:id', (request, response) => {

    const pizzaPrice = pizzas.find( pizza => pizza.id == request.params.id)
    if(!pizzaPrice) {
        return response.status(404).json({error: "Desculpe, não encontramos seu produto!"})
    }
    pizzaPrice.price = request.body.price

    response.json(pizzaPrice)

})


//listar todos os pedidos
app.get('/solicitations', (request, response) => {
   
    response.json(solicitations)
})

//buscar um pedido
app.get('/solicitations/:id', (request, response) => {

    const solicitation = solicitations.find( solicitation => solicitation.id == request.params.id)

    if(!solicitation) {
        return response.status(404).json({error: "Desculpe, não encontramos seu pedido!"})
    }
    response.json(solicitation)
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

//atualizar status do pedido
app.patch('/solicitations/:id/active', (request, response) => {

    const solicitation = solicitations.find(solicitation => solicitation.id == request.params.id)
    if(!solicitation) {
        return response.status(404).json({error: "Desculpe, não encontramos seu pedido!"})
    } 
    solicitation.order = "A CAMINHO"      

    //caso queira retornar todo o array de pedidos
   /* const solicitationsOrder = solicitations.map(solicitation => {
        if (solicitation.id == request.params.id){
            solicitation.order = "A CAMINHO"
        }
        return solicitation
    })*/
    //solicitations = [... solicitationsOrder ]

    response.json(solicitation)   

})

app.listen(3333, () => {
    console.log("Servidor no ar!");
})