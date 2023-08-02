import { Schema, model, Document } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import { UserDTO } from './UserDTO'

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
