import mongoose from 'mongoose'

const Item = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    content : {
        type : String,
    },
    

    items: [{
        name: {
            type: String,
            required: true,

        },
        privacy: {
            type: String,
            enum: ['public', 'private'],
            default: 'public'
        }
    }],





}, { timestamps: true });

export const Items = mongoose.models.Item || mongoose.model('Item', Item)
