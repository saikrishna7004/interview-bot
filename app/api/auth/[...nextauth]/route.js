import connectMongo from "@/utils/connectMongo"; 
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authenticateUser } from "@/utils/authenticateUser";

async function connect() {
    await connectMongo();
    console.log('Attempted a connection');
}

connect();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await authenticateUser(credentials);
                return user ? user : null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                    // scope: 'openid email profile https://www.googleapis.com/auth/calendar'
                }
            },
            async profile(profile) {
                return {
                    id: profile.sub,
                    email: profile.email,
                    name: profile.name,
                    image: profile.picture,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, user, account }) {
            await connectMongo();

            if (account?.provider === 'google') {
                let existingUser = await User.findOne({ email: token.email });
                console.log(existingUser)

                if (!existingUser) {
                    let baseUsername = token.name.split(' ').join('').toLowerCase();
                    let uniqueUsername = baseUsername;
                    let usernameExists = await User.findOne({ username: uniqueUsername });
                    
                    if (usernameExists) {
                        const emailPrefix = token.email.split('@')[0];
                        uniqueUsername = emailPrefix;
                    }

                    existingUser = await User.create({
                        username: uniqueUsername,
                        email: token.email,
                        name: token.name,
                        role: 'user',
                        image: token.picture,
                        googleAccessToken: account.access_token,
                        googleRefreshToken: account.refresh_token,
                        status: 'active'
                    });

                    token._id = existingUser._id;
                    token.username = existingUser.username;
                    token.email = existingUser.email;
                    token.role = existingUser.role;
                    token.image = existingUser.image;
                    token.googleAccessToken = account.access_token;
                    token.googleRefreshToken = account.refresh_token;
                    token.preferredTopics = existingUser.preferredTopics || '';
                    token.jobDescription = existingUser.jobDescription || '';
                    token.resumeText = existingUser.resumeText || ''; 
                } else {
                    token._id = existingUser._id;
                    token.username = existingUser.username;
                    token.email = existingUser.email;
                    token.role = existingUser.role;
                    token.image = existingUser.image;
                    token.googleAccessToken = account.access_token;
                    token.googleRefreshToken = account.refresh_token;
                    token.preferredTopics = existingUser.preferredTopics || '';
                    token.jobDescription = existingUser.jobDescription || '';
                    token.resumeText = existingUser.resumeText || ''; 
                }
            }

            else if (user) {
                token._id = user._id;
                token.username = user.username;
                token.email = user.email;
                token.role = user.role;
                token.image = user.image;
                if (account?.provider === 'google') {
                    token.googleAccessToken = account.access_token;
                    token.googleRefreshToken = account.refresh_token;
                }
                
                token.preferredTopics = user.preferredTopics || '';
                token.jobDescription = user.jobDescription || '';
                token.resumeText = user.resumeText || ''; 
            }

            console.log(token);
            return token;
        },
        async session({ session, token }) {
            await connectMongo();
            const dbUser = await User.findById(token._id);

            session.user._id = dbUser._id;
            session.user.username = dbUser.username;
            session.user.email = dbUser.email;
            session.user.role = dbUser.role;
            session.user.image = dbUser.image;
            session.user.name = dbUser.name;

            session.user.preferredTopics = dbUser.preferredTopics || '';
            session.user.jobDescription = dbUser.jobDescription || '';
            session.user.resumeText = dbUser.resumeText || '';

            if (token.googleAccessToken) {
                session.googleAccessToken = token.googleAccessToken;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
