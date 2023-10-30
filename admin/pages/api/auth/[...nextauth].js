import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
const adminEmails = [process.env.ADMIN_EMAIL];
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  }),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        console.log({ session, token, user });
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminAuth(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (!adminEmails.includes(session?.user?.email)) {
    throw new Error('not an admin');
  }
}
