export interface UserDTO {
    _id: string
    email: string
    fullName: string
    password: string
    avatar: string
    isActivated: boolean
    lastSeen?: string
    activationLink?: string
}
