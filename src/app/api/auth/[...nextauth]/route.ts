import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticator } from '@otplib/preset-default';

const SECRET = process.env.TOTP_SECRET;
if (!SECRET) throw new Error('TOTP_SECRET is not defined');

export const authOptions: AuthOptions = {
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
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Google Authenticator',
      credentials: {
        code: { label: "Code", type: "text" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.code) return null;
          const isValid = authenticator.verify({
            token: credentials.code,
            secret: SECRET
          });
          return isValid ? { id: '1', name: 'Admin' } : null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };