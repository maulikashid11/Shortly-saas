import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    membershipPlan: {
        type: String,
        required: true,
        enum: ['free', 'premium'],
        default: 'free'
    },
})

const User = mongoose.models?.user || mongoose.model('user', userSchema);
export default User;