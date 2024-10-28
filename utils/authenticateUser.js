import User from '@/models/User';
import connectMongo from "./connectMongo";

export async function authenticateUser(credentials) {
    await connectMongo();

    try {
        let user = await User.findOne({ username: credentials.username, password: credentials.password }).select('-password')
        if (user) {
            return user
        }
        else {
            return null
        }
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}