import fs from 'fs'

//função genérica para leitura de arquivos

export function readFileJson(fileName: 'src/database/solicitations.json' | 'src/database/pizzas.json'){
   const data = JSON.parse(fs.readFileSync(fileName).toString())
   return data
}

// outra forma 
/*
export function readFileJson(fileName: 'solicitations.json' | 'pizzas.json'){
   return  JSON.parse(fs.readFileSync(fileName).toString()) as Pizza[]   
}
*/


//exemplo com objeto
/*
interface Aluno {
   name: string
}
export function readFileJson(fileName: Aluno) {
   return JSON.parse(fs.readFileSync(fileName).toString())
}
*/