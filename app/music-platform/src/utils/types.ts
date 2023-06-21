export type CreateUserParams = {
    name: string
    password: string
}

export type CreateProductParams = {
    name: string
    description:string
    price: number
    ownerId: number
}

export type JwtAtPayload = {
    sub: number
    name: string
    playlists: number[]
}
export type JwtRtPayload = {
    sub: number
    name: string
    playlists: number[]
    refresh_token:string
}