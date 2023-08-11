import { DialogDTO } from '../types/DTO/DialogDTO'
import { Schema, model, Document } from 'mongoose'

interface ISchema extends DialogDTO {}

const schema = new Schema<ISchema>(
    {
        members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
        lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    },
    {
        timestamps: true,
    }
)

export const DialogModel = model('Dialog', schema)
