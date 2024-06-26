import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
import { JWT } from 'next-auth/jwt';
import { db } from '@vercel/postgres';

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
      const isOnVinos = nextUrl.pathname.startsWith('/vino');
      const isOnRegister = nextUrl.pathname.startsWith('/auth/register');
      const isOnMaridaje = nextUrl.pathname.startsWith('/maridaje');
      const baseUrl = process.env.NEXTAUTH_URL;
      const isOnAdminUnavailableWines = nextUrl.pathname.startsWith('/admin/unavailableWines');

      if (isLoggedIn) {
        if (auth?.user?.role === 'admin') {
          if (isOnAdmin  || isOnAdminUnavailableWines ) {
            return true;
          } else {
            return NextResponse.redirect(baseUrl + '/admin');
          }
        } else {
          if (isOnLogin || isOnRegister || isOnAdmin) {
            return NextResponse.redirect(baseUrl + '/');
          }
          return true;
        }
      } else {
        // Usuarios no logueados pueden navegar por todas partes excepto /admin
        if (isOnAdmin) {
          return NextResponse.redirect(baseUrl + '/auth/login');
        }
        return true;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'signIn') {
        return {
          ...token,
          id: user.id,
          email: user.email,
          role: user.role,
        };
      }

      if (trigger === 'update' && session?.user) {
        try {
          // Actualiza la información del usuario en la base de datos
          const client = await db.connect();
          const result = await client.query(
            `UPDATE users SET name = $1, role = $2 WHERE email = $3 RETURNING *`,
            [session.user.name, session.user.role, session.user.email]
          );
          client.release();

          // Si no se pudo actualizar el usuario, retorna el token original
          if (!result.rows[0]) {
            return token;
          }

          return {
            ...token,
            id: result.rows[0].id,
            email: result.rows[0].email,
            role: result.rows[0].role,
          };
        } catch (error) {
          console.error('Error updating user:', error);
          return token;
        }
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
  providers: [], 
} satisfies NextAuthConfig;
