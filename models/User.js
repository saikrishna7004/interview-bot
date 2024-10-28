import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'mentor', 'writer', 'traineeDev', 'seniorDev', 'subscriber', 'guestAuthor'],
        default: 'subscriber'
    },
    picture: {
        type: String
    },
    hobbies: {
        type: String
    },
    status: {
        type: String,
        enum: ['working', 'studying', 'others'],
        required: true
    },
    focus: {
        type: String
    }
});

const User = models.User || model('User', userSchema);

export default User;
