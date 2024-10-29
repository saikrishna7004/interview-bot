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
        enum: ['admin', 'user'],
        default: 'subscriber'
    },
    image: {
        type: String
    },
    googleAccessToken: {
        type: String
    },
    googleRefreshToken: {
        type: String
    }
});

const User = models.User || model('User', userSchema);

export default User;
