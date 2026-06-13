import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi, messageFromError, storage } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.getUser());
  const [token, setToken] = useState(() => storage.getToken());
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(storage.getToken()));
  const [authError, setAuthError] = useState("");

  const isAuthenticated = Boolean(token);

  const refreshUser = useCallback(async () => {
    if (!storage.getToken()) {
      setIsBootstrapping(false);
      return null;
    }

    try {
      const currentUser = await authApi.currentUser();
      setUser(currentUser);
      storage.setSession({ user: currentUser });
      setAuthError("");
      return currentUser;
    } catch (error) {
      setAuthError(messageFromError(error));
      return storage.getUser();
    } finally {
      setIsBootstrapping(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (credentials) => {
    const session = await authApi.login(credentials);
    setToken(session.token);
    setUser(session.user);
    storage.setSession(session);
    return session;
  }, []);

  const register = useCallback(async (values) => authApi.register(values), []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setToken(null);
    setUser(null);
    storage.clearSession();
  }, []);

  const value = useMemo(
    () => ({
      authError,
      isAuthenticated,
      isBootstrapping,
      login,
      logout,
      refreshUser,
      register,
      token,
      user,
    }),
    [authError, isAuthenticated, isBootstrapping, login, logout, refreshUser, register, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
