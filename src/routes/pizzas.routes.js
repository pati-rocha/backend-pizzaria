import { Router } from "express"
import { 
    create, 
    destroy, 
    findMany, 
    update, 
    updateOne } from "../controllers/pizza.controller.js"

export const pizzasRoutes = Router()


pizzasRoutes.get('/pizzas', findMany)

pizzasRoutes.post('/pizzas', create)

pizzasRoutes.put('/pizzas/:id', update)

pizzasRoutes.patch('/pizzas/:id', updateOne)

pizzasRoutes.delete('/pizzas/:id', destroy)
