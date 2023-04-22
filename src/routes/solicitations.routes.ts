
import { Router } from "express"
import { create, destroy, findMany, findOne, updateStatus } from "../controllers/solicitation.controller"

export const solicitationsRoutes = Router()

solicitationsRoutes.get('/solicitations', findMany)


solicitationsRoutes.get('/solicitations/:id', findOne)


solicitationsRoutes.post('/solicitations', create)


solicitationsRoutes.patch('/solicitations/:id/status', updateStatus)


solicitationsRoutes.delete('/solicitations/:id', destroy)