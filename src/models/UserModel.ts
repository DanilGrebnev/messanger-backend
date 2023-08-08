import { Schema, model, Document } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import { UserDTO } from '../types/DTO/UserDTO'

interface IUserSchema extends UserDTO {}

const schema = new Schema<IUserSchema>(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            validate: {
                validator: (v: string) => isEmail(v),
                message: props => `${props.value} is not a valid email`,
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
        },
        lastSeen: {
            type: String,
            default: new Date(),
        },
        isActivated: {
            type: Boolean,
            default: false,
        },
        activationLink: String,
        avatar: { type: String, default: '' },
    },
    {
        timestamps: true,
    }
)

export const UserModel = model('User', schema)
