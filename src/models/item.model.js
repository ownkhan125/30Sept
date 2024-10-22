import mongoose from 'mongoose'
import { User } from './user.model';


const itemSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    content: {
        type: String,
        required: true
    },

    privacy: {
        type: String,
        enum: ["public", "private"]
    },
    deletedAt : {
        type : Date,
        expires : "1m",
        default : null
    }


}, { timestamps: true });


export const Items = mongoose.models.Item || mongoose.model('Item', itemSchema)
