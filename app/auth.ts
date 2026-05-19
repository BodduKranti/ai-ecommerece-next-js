import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { INTERNAL_HOST_URL } from "./src/utils/constants";
import axios from "axios";
const authOptions: NextAuthConfig = {
    trustHost: true,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },

            async authorize(credentials) {
                console.log('crendetial', credentials)

                const CREDENTIAL_LOGIN_URL = `${INTERNAL_HOST_URL}/api/login`;
                console.log('LOGIN_URL: ', CREDENTIAL_LOGIN_URL)

                try {
                    let responseData: any = null;
                    const { username, password } = credentials || {}

                    const response = await axios.post(CREDENTIAL_LOGIN_URL, {
                        username,
                        password
                    }, {
                        headers: { 'Content-Type': 'application/json' },
                    })

                    responseData = { ...response?.data };

                    console.log('responseData', responseData)
                    console.log('response', response)
                    return { ...responseData };
                } catch (error: any) {
                    console.error('Error during authorization', error?.message);
                    throw new Error(error?.message ?? 'Something went wrong!!!');
                }

            },
        }),
    ],

    session: {
        jwt: true,
    } as any,
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET,
    } as any,
    callbacks: {

        async jwt({ token, user }: any) {

            if (user) {
                console.log('jwt token', token)
                console.log('user', user)
                token.accessToken = user.accessToken;
                token.name = `${user.firstName || ''} ${user.lastName || ''}`.trim();

                token.username =
                    user.username ||
                    user.email;
            }
            return token;
        },

        async session({ session, token }: any) {

            console.log('session', session)
            console.log('token', token)

            return token
        },
    }
}
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);