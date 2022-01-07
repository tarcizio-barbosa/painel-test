import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  _message: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  signOut: () => void;
  signIn: (userEmail: string, userPassword: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
};

export function AuthProvider(pros: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn(userEmail: string, userPassword: string) {
    const response = await api.post<AuthResponse>("sessions", {
      userEmail: userEmail,
      userPassword: userPassword,
    });

    const { token, user, _message } = response.data;

    localStorage.setItem("@painel:token", token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@painel:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@painel:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut, signIn }}>
      {pros.children}
    </AuthContext.Provider>
  );
}
