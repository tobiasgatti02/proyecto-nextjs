import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
import { JWT } from 'next-auth/jwt';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnCompras = nextUrl.pathname.startsWith('/compras');
      const isOnLogin = nextUrl.pathname.startsWith('/auth/login');
      const isOnHome = nextUrl.pathname === '/';
      const isOnSuscripciones = nextUrl.pathname.startsWith('/suscripciones');
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const isOnCarrito = nextUrl.pathname.startsWith('/carrito');

      if (isLoggedIn) {
        if (isOnLogin) {
          return NextResponse.redirect(baseUrl + '/');
        }
        if (isOnCompras) {
          return true;
        }
        if (isOnAdmin) {
          if (auth?.user?.role === 'admin') {
            return true;
          } else {
            return NextResponse.redirect(baseUrl + '/');
          }
        }
      } 
      else {
        if (isOnAdmin) {
          return NextResponse.redirect(baseUrl + '/auth/login');
        }
        if (isOnLogin || isOnCompras || isOnSuscripciones || isOnHome || isOnCarrito) {
          return true;
        }
      }

      return NextResponse.next(); // Handle all other cases
    },
    async jwt({ token, user, trigger }) {
      if (trigger === 'signIn' && user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
