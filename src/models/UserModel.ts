import { UserDTO } from '../types/DTO/UserDTO'
import { Schema, model, Document } from 'mongoose'
import isEmail from 'validator/lib/isEmail'

type TUserSchema = UserDTO & Document

const schema = new Schema<TUserSchema>(
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
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
        lastSeen: {
            type: Date,
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
