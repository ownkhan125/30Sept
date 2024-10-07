import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // profilePicture: {
    //     type: String,
    // },
    password: {
        type: String,
        required: true,
    },
    // verifiedEmail: {
    //     type: Boolean,
    //     required: true
    // },
    // role: {
    //     type: String,
    //     enums: ["user , admin"],
    //     default: "user",
    //     required: true
    // }
});

export const User = mongoose.models.users || mongoose.model('users', UserSchema)