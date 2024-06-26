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
      const baseUrl = process.env.NEXTAUTH_URL;

      // Si el usuario está logueado
      if (isLoggedIn) {
        // Si el usuario es admin
        if (auth?.user?.role === 'admin') {
          // Permitir acceso solo a /admin
          if (isOnAdmin) {
            return true;
          } else {
            return NextResponse.redirect(baseUrl + '/admin');
          }
        } else {
          // Usuario no admin, permitir navegación en todos lados excepto /admin
          if (isOnAdmin) {
            return NextResponse.redirect(baseUrl + '/');
          } else {
            return true;
          }
        }
      }

      // Si el usuario no está logueado
      if (!isLoggedIn) {
        // Permitir navegación en todos lados excepto /admin
        if (isOnAdmin) {
          return NextResponse.redirect(baseUrl + '/auth/login');
        } else {
          return true;
        }
      }

      return NextResponse.next();
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
