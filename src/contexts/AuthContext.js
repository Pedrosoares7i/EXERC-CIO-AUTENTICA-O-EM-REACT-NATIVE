import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { login as loginService } from "../services/authService";

const SESSION_KEY = "@meucurso:session";
const ESPERA_MINIMA = 600;

const AuthContext = createContext(null);

function aguardar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaura a sessão salva ao abrir o app.
  useEffect(() => {
    let ativo = true;

    async function restaurarSessao() {
      const inicio = Date.now();

      try {
        const sessaoSalva = await AsyncStorage.getItem(SESSION_KEY);

        if (sessaoSalva) {
          try {
            const sessao = JSON.parse(sessaoSalva);

            if (sessao?.user && sessao?.token) {
              if (ativo) {
                setUser(sessao.user);
                setToken(sessao.token);
              }
            } else {
              await AsyncStorage.removeItem(SESSION_KEY);
            }
          } catch {
            // JSON corrompido: trata como "sem sessão" e limpa a chave.
            await AsyncStorage.removeItem(SESSION_KEY);
          }
        }
      } catch {
        // Falha ao ler o armazenamento: segue sem sessão.
      } finally {
        // Mantém a tela de verificação visível por um tempo mínimo.
        const restante = ESPERA_MINIMA - (Date.now() - inicio);
        if (restante > 0) {
          await aguardar(restante);
        }

        if (ativo) {
          setLoading(false);
        }
      }
    }

    restaurarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  const login = useCallback(async (email, senha) => {
    const resposta = await loginService(email, senha);

    try {
      // A senha não é persistida: apenas user e token.
      await AsyncStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ user: resposta.user, token: resposta.token })
      );
    } catch {
      // Mesmo sem persistir, a sessão em memória continua válida.
    }

    setUser(resposta.user);
    setToken(resposta.token);

    return resposta;
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
    } finally {
      setUser(null);
      setToken(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, logout }),
    [user, token, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return contexto;
}
