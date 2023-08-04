import { Schema, model } from 'mongoose'

// type TDialogSchema = DialogDTO & Document

const schema = new Schema(
    {
        text: String,
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        dialog: { type: Schema.Types.ObjectId, ref: 'Dialog' },
    },
    {
        timestamps: true,
    }
)

export const MessageModel = model('Message', schema)
