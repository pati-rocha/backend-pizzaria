import fs from 'fs'

export function getSolicitationsInFile(){

    const solicitationsFile = fs.readFileSync('src/database/solicitations.json').toString()
    const solicitations = JSON.parse(solicitationsFile)
    return solicitations

}