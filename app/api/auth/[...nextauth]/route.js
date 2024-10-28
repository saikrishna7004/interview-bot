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
                    scope: 'openid email profile https://www.googleapis.com/auth/calendar'
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
            if (user) {
                token._id = user._id;
                token.username = user.username;
                token.email = user.email;
                token.role = user.role;
                if (account?.provider === 'google') {
                    token.googleAccessToken = account.access_token;
                    token.googleRefreshToken = account.refresh_token;
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user._id = token._id;
            session.user.username = token.username;
            session.user.email = token.email;
            session.user.role = token.role;
            session.user.picture = token.image || token.picture;
            if (token.googleAccessToken) {
                session.googleAccessToken = token.googleAccessToken;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
