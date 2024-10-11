import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    items: [{
        name: {
            type: String,
            required: true,
        },
    }]
}, { timestamps: true });

export const UserData = mongoose.models.userData || mongoose.model('userData', UserSchema)
