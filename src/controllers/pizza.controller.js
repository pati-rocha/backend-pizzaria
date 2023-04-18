import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import { getPizzasInFile } from '../utils/getPizzasInFile.js'

//listar todas as pizzas
export function findMany( req, res){

    const nameQuery = req.query.name || ""

    const pizzas = getPizzasInFile()

    const pizzasFiltered = pizzas.filter( pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))

    res.json(pizzasFiltered)   
}

//cadastrar pizza
export function create( req, res){
      
    const { name, url, description, price, ingredients } = req.body

    const pizzas = getPizzasInFile()

    const pizzaExist = pizzas.find( pizza => pizza.name == name)

    if( pizzaExist) {
        return res.status(401).json({ error: 'Pizza já encontra-se cadastrada!'})
    }

    const pizza = {
        id: uuidv4(),
        name,
        url,
        description,
        price,
        ingredients, 
        order: "EM PRODUÇÃO"
    }
    fs.writeFileSync('src/database/pizzas.json', JSON.stringify([...pizzas, pizza]))

    res.status(201).json(pizza)
}

//atualizar pizza
export function update( req, res) {

    const pizzas = getPizzasInFile()

    const pizza = pizzas.find( pizza => pizza.id == req.params.id)
    if(!pizza) {
        return res.status(404).json({error: "Desculpe, não encontramos seu produto! "})
    }

    const newPizzas = pizzas.map( pizza => {
        if (pizza.id == req.params.id) {
            pizza.name = req.body.name
            pizza.url = req.body.url
            pizza.description = req.body.description
            pizza.price = req.body.price
            pizza.ingredients = req.body.ingredients
        }
        return pizza        
    })

    fs.writeFileSync('src/database/pizzas.json',JSON.stringify(newPizzas))   
    res.json()
}

//atualizar preço da pizza
export function updateOne( req, res) {

    const pizzas = getPizzasInFile()

    const pizzaPrice = pizzas.find( pizza => pizza.id == req.params.id)
    if(!pizzaPrice) {
        return res.status(404).json({error: "Desculpe, não encontramos seu produto!"})
    }
    pizzaPrice.price = req.body.price

    fs.writeFileSync('src/database/pizzas.json',JSON.stringify(pizzas))   

    res.json(pizzaPrice)
}

//deletar pizza
export function destroy( req, res){
    
   const pizzas = getPizzasInFile()
   const pizzasFiltered = pizzas.filter( pizza => pizza.id != req.params.id)

   fs.writeFileSync('src/database/pizzas.json',JSON.stringify(pizzasFiltered))   

   res.json()
}