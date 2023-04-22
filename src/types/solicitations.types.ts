export interface QueryParamsFindManySolicitations{
    cpf_client?: string
    contact_client: string
}

export interface Solicitation{
    id: string
    name_client: string
    cpf_client: string
    contact_client: string
    address_client: string
    payment_method: string
    observations: string
    pizzas: object[]
    order: string
}

export interface BodyParamsCreateSolicitation{
    name_client: string
    cpf_client: string
    contact_client: string
    address_client: string
    payment_method: string
    observations: string
    pizzas: object[]
}

export interface RouteParamsSolicitation {
    id: string
    order: string
}

export interface BodyUpdateSolicitation {
    order: string
}