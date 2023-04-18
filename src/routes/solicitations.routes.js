
import { Router } from "express"
import { activeOne, create, destroy, findMany, findOne } from "../controllers/solicitation.controller.js"

export const solicitationsRoutes = Router()

solicitationsRoutes.get('/solicitations', findMany)


solicitationsRoutes.get('/solicitations/:id', findOne)


solicitationsRoutes.post('/solicitations', create)


solicitationsRoutes.patch('/solicitations/:id/active', activeOne)


solicitationsRoutes.delete('/solicitations/:id', destroy)