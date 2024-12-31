import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticator } from '@otplib/preset-default';

if (!process.env.TOTP_SECRET) {
    throw new Error('TOTP_SECRET must be defined');
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Google Authenticator',
            credentials: {
                code: { label: "Code", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.code) {
                    return null;
                }
                
                try {
                    const isValid = authenticator.check(
                        credentials.code,
                        process.env.TOTP_SECRET!
                    );
                    
                    if (isValid) {
                        return { id: '1', name: 'Admin' };
                    }
                    return null;
                } catch (error) {
                    console.error('Authentication error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin'
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: token
            };
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};