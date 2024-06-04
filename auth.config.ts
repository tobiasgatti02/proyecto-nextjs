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
      const isOnCarrito = nextUrl.pathname.startsWith('/carrito');
      const isOnSuscripciones = nextUrl.pathname.startsWith('/suscripciones');
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

      if (isLoggedIn) {
        
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
      if (!isLoggedIn) {
        if (isOnLogin || isOnHome || isOnSuscripciones || isOnCompras || isOnCarrito) {
          return true;
        }
        
        return NextResponse.redirect(baseUrl + '/auth/login');
        
      }
    
        return NextResponse.next();
      
    
      
     
    },
    async jwt({ token, user, trigger,session }) {
      if (trigger === 'signIn') {
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
