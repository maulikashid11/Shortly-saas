import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
}, { timestamps: true })

const Link = mongoose?.models?.link || mongoose.model('link', linkSchema);
export default Link;