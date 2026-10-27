import {
  createContext,
  useState,
  type ReactNode,
} from "react";

import {
  getToken,
  removeToken,
  setToken,
} from "../utils/token";

import type { AuthUser } from "../types/auth.types";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [token, setAuthToken] =
    useState<string | null>(() => getToken());

  function login(
    newToken: string,
    user: AuthUser,
  ) {
    setToken(newToken);

    setAuthToken(newToken);
    setUser(user);
  }

  function logout() {
    removeToken();

    setAuthToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}