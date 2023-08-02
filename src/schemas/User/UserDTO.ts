export interface UserDTO {
    email: string
    fullname: string
    password: string
    avatar?: string
    confirmed?: boolean
    confirm_hash?: string
    last_seen?: string
}
