import { useSession } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.FC) => {
const Wrapper = (props: any) => {
    const { data: session, status: loading } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (!loading && !session) {
            router.push('/auth/login'); // Redirige a la página de inicio de sesión si el usuario no está autenticado
        }
    }, [loading, session, router]);

    if (loading === "loading") return <p>Loading...</p>;
    if (!session) return null; // Si no hay sesión, no renderiza el componente

    return <WrappedComponent {...props} />;
};

  return Wrapper;
};

export default withAuth;
