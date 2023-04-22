import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import { Request, Response } from 'express'
import { BodyParamsCreatePizza, Pizza, QueryParamsFindManyPizzas} from '../types/pizzas.types'
import { readFileJson } from '../utils/readFileJson'

//listar todas as pizzas
export function findMany( req: Request< {}, {}, {}, QueryParamsFindManyPizzas>, res: Response){

    const nameQuery = req.query.name || ""

    const pizzas: Pizza[] = readFileJson('src/database/pizzas.json')

    const pizzasFiltered = pizzas.filter( pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))

    res.json(pizzasFiltered)   
}

//cadastrar pizza
export function create( req: Request<{}, {}, BodyParamsCreatePizza>, res: Response){
     
    const { name, url, description, price, ingredients } = req.body

    const pizzas: Pizza[] = readFileJson('src/database/pizzas.json')

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
export function update( req: Request, res: Response) {

    const pizzas: Pizza[] = readFileJson('src/database/pizzas.json')

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
export function updateOne( req: Request, res: Response) {

    const pizzas: Pizza[] = readFileJson('src/database/pizzas.json')

    const pizzaPrice = pizzas.find( pizza => pizza.id == req.params.id)
    if(!pizzaPrice) {
        return res.status(404).json({error: "Desculpe, não encontramos seu produto!"})
    }
    pizzaPrice.price = req.body.price

    fs.writeFileSync('src/database/pizzas.json',JSON.stringify(pizzas))   

    res.json(pizzaPrice)
}

//deletar pizza
export function destroy( req: Request, res: Response){
    
   const pizzas: Pizza[] = readFileJson('src/database/pizzas.json')
   const pizzasFiltered = pizzas.filter( pizza => pizza.id != req.params.id)

   fs.writeFileSync('src/database/pizzas.json',JSON.stringify(pizzasFiltered))   

   res.json()
}