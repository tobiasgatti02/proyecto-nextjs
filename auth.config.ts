import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always redirect to home after sign in
      return `${baseUrl}`; // Redirect to panel using baseUrl
    },
  },
  providers: [], // Add providers with an empty array for now
};
