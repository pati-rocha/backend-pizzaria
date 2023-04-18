import fs from 'fs'

export function getPizzasInFile(){

    const pizzasFile = fs.readFileSync('src/database/pizzas.json').toString()
    const pizzas = JSON.parse(pizzasFile)
    return pizzas

}