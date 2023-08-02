import { Schema, model } from 'mongoose'
import { UserDTO } from './UserDTO'
import isEmail from 'validator/lib/isEmail'

const schema = new Schema<UserDTO>(
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
        fullname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
        avatar: String,
        confirm_hash: String,
        last_seen: Date,
    },
    {
        timestamps: true,
    }
)

export const UserModel = model('User', schema)
