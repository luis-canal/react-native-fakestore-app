import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { login } from '../services/api';
import {
  clearAuthSession,
  getAuthSession,
  saveAuthSession,
} from '../utils/authStorage';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializationError, setInitializationError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const storedSession = await getAuthSession();
        if (isMounted) {
          setSession(storedSession);
        }
      } catch {
        if (isMounted) {
          setInitializationError(
            'Não foi possível restaurar a sessão. Reinicie o aplicativo e tente novamente.',
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const entrar = useCallback(async (credentials) => {
    const result = await login(credentials);
    const { accessToken, refreshToken, ...user } = result;

    if (!accessToken) {
      throw new Error('A resposta de autenticação não incluiu um accessToken.');
    }

    const nextSession = {
      accessToken,
      refreshToken: refreshToken || null,
      user,
    };

    await saveAuthSession(nextSession);
    setSession(nextSession);
    return user;
  }, []);

  const sair = useCallback(async () => {
    await clearAuthSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      accessToken: session?.accessToken || null,
      authenticated: Boolean(session?.accessToken),
      initializationError,
      loading,
      user: session?.user || null,
      entrar,
      sair,
    }),
    [entrar, initializationError, loading, sair, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de AuthProvider.');
  }

  return context;
}
