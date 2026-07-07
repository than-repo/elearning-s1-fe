"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import * as authApi from "@/features/auth/api/auth-api";
import type {
  AuthUser,
  CurrentUser,
  LoginInput,
  RegisterInput,
  UserRole,
} from "@/features/auth/types/auth";
import type { UserProfile } from "@/features/users/types/profile";

export type AuthStatus = "authenticated" | "guest" | "loading";

export type AuthContextValue = {
  accessToken: string | null;
  error: string | null;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
  register: (input: RegisterInput) => Promise<void>;
  status: AuthStatus;
  updateUser: (nextUser: Partial<CurrentUser>) => void;
  user: CurrentUser | null;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const sessionCheckTimeoutMs = 5000;

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Authentication failed.";
}

function isAllowedRole(role: string): role is UserRole {
  return ["LEARNER", "INSTRUCTOR", "REVIEWER", "ADMIN"].includes(role);
}

function normalizeUser(user: CurrentUser): CurrentUser {
  return {
    ...user,
    role: isAllowedRole(user.role) ? user.role : "LEARNER",
  };
}

function withSessionTimeout<T>(promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error("Session check timed out."));
    }, sessionCheckTimeoutMs);

    promise
      .then((value) => {
        window.clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error: unknown) => {
        window.clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);

  const setAuthenticatedSession = useCallback(
    async (nextAccessToken: string, fallbackUser: AuthUser) => {
      setAccessToken(nextAccessToken);
      setStatus("authenticated");

      try {
        const currentUser = await authApi.getCurrentUser(nextAccessToken);
        setUser(normalizeUser(currentUser));
      } catch {
        setUser(normalizeUser(fallbackUser));
      }
    },
    [],
  );

  const updateUser = useCallback((nextUser: Partial<CurrentUser>) => {
    setUser((prevUser) => {
      if (!prevUser) {
        return prevUser;
      }
      return normalizeUser({
        ...prevUser,
        ...nextUser,
      });
    });
  }, []);

  const refresh = useCallback(async () => {
    try {
      const result = await withSessionTimeout(authApi.refreshSession());
      await setAuthenticatedSession(result.accessToken, result.user);
      setError(null);
      return true;
    } catch {
      setAccessToken(null);
      setUser(null);
      setStatus("guest");
      return false;
    }
  }, [setAuthenticatedSession]);

  useEffect(() => {
    let isMounted = true;

    withSessionTimeout(authApi.refreshSession())
      .then(async (result) => {
        if (!isMounted) {
          return;
        }

        await setAuthenticatedSession(result.accessToken, result.user);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setAccessToken(null);
        setUser(null);
        setStatus("guest");
      });

    return () => {
      isMounted = false;
    };
  }, [setAuthenticatedSession]);

  const login = useCallback(
    async (input: LoginInput) => {
      setError(null);

      try {
        const result = await authApi.login(input);
        await setAuthenticatedSession(result.accessToken, result.user);
      } catch (loginError) {
        const message = getMessage(loginError);
        setError(message);
        throw new Error(message);
      }
    },
    [setAuthenticatedSession],
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      setError(null);

      try {
        const result = await authApi.register(input);
        await setAuthenticatedSession(result.accessToken, result.user);
      } catch (registerError) {
        const message = getMessage(registerError);
        setError(message);
        throw new Error(message);
      }
    },
    [setAuthenticatedSession],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null);
      setError(null);
      setStatus("guest");
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      error,
      login,
      logout,
      refresh,
      register,
      status,
      updateUser,
      user,
    }),
    [
      accessToken,
      error,
      login,
      logout,
      refresh,
      register,
      status,
      updateUser,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
