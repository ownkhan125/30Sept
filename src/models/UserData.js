import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    email: {
        type: String,
        required: true,
    },

    items: [{
        name: {
            type: String,
            required: true,
        },
    }],

    privacy: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    }

   

}, { timestamps: true });

export const UserData = mongoose.models.userData || mongoose.model('userData', UserSchema)
