export interface QueryParamsFindManyPizzas {
    name?: string
}

export interface Pizza {
    id: string
    name: string
    url: string
    description: string
    price: number
    ingredients: string[]
}

export interface BodyParamsCreatePizza {
    name: string
    url: string
    description: string
    price: number
    ingredients: string[]
}