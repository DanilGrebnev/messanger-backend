import { DialogDTO } from '../../types/DTO/DialogDTO'
import { Schema, model, Document } from 'mongoose'

// type TDialogSchema = DialogDTO & Document

const schema = new Schema(
    {
        authors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    },
    {
        timestamps: true,
    }
)

export const DialogModel = model('Dialog', schema)
