import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import { getSolicitationsInFile } from '../utils/getSolicitationsInFile.js'

//listar pedidos OBS:TRAB COM QUERY PARAMS DE FORMA OPCIONAL
export function findMany( req, res){

    const solicitations = getSolicitationsInFile()

    const cpfQuery = req.query.cpf_client || ""
    const contactQuery = req.query.contact_client || ""

    const solicitationSearch = solicitations.filter( solicitation => 
        solicitation.cpf_client.includes(cpfQuery)
        &&
        solicitation.contact_client.includes(contactQuery)
    )
        return res.json(solicitationSearch)
}

//buscar um pedido
export function findOne( req, res) {

    const solicitations = getSolicitationsInFile()

    const solicitation = solicitations.find( solicitation => solicitation.id == req.params.id)

    if(!solicitation) {
        return res.status(404).json({error: "Desculpe, não encontramos seu pedido!"})
    }

    res.json(solicitation)
}

//cadastrar pedido
export function create( req, res){
    
    const {
        name_client,
        cpf_client,
        contact_client,
        address_client,
        payment_method,
        observations,
        pizzas
    } = req.body
    
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
    const solicitations = getSolicitationsInFile()
    
    fs.writeFileSync('src/database/solicitations.json', JSON.stringify([... solicitations, solicitation]))

    res.status(201).json(solicitation)
}

//atualizar status do pedido
export function updateStatus( req, res) {

    const solicitations = getSolicitationsInFile()

    const solicitation = solicitations.find(solicitation => solicitation.id == req.params.id)
    if(!solicitation) {
        return res.status(404).json({error: "Desculpe, não encontramos seu pedido!"})
    } 
    solicitation.order = "A CAMINHO"    

    fs.writeFileSync('src/database/solicitations.json', JSON.stringify(solicitations))  

    res.json(solicitation)   
    //caso queira retornar todo o array de pedidos
   /* const solicitationsOrder = solicitations.map(solicitation => {
        if (solicitation.id == request.params.id){
            solicitation.order = "A CAMINHO"
        }
        return solicitation
    })*/
    //solicitations = [... solicitationsOrder ]

}

//deletar pedido
export function destroy( req, res){

    const solicitations = getSolicitationsInFile()

    const solicitationsFiltered = solicitations.filter(solicitation => solicitation.id != req.params.id)
    
    fs.writeFileSync('src/database/solicitations.json', JSON.stringify(solicitationsFiltered))    
    
    res.json()
}