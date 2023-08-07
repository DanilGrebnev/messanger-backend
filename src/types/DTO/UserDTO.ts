export interface UserDTO {
    email: string
    fullName: string
    password: string
    avatar?: string
    confirmed?: boolean
    confirm_hash?: string
    lastSeen?: string
    isActivated?: boolean
    activationLink?: string
}
