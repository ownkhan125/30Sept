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

    favorites: [{
      type : mongoose.Types.ObjectId,
      ref : "users"
    }]

}, { timestamps: true });

export const Items = mongoose.models.Item || mongoose.model('Item', itemSchema)
