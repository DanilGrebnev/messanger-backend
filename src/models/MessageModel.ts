import { Schema, model } from 'mongoose'

const schema = new Schema(
    {
        text: String,
        senderId: { type: Schema.Types.ObjectId, ref: 'User' },
        dialogId: { type: Schema.Types.ObjectId, ref: 'Dialog' },
    },
    {
        timestamps: true,
    }
)

export const MessageModel = model('Message', schema)
