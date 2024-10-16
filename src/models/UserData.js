import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

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

export const UserData = mongoose.models.userData || mongoose.model('userData', UserSchema)
