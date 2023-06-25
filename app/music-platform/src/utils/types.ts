import { Playlist } from "src/entities/playlist.entity"

export type CreateUserParams = {
    username: string
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
    playlists: Playlist[]
}
export type JwtRtPayload = {
    sub: number
    name: string
    playlists: Playlist[]
    refresh_token:string
}