import { createContext, ReactNode, useEffect, useState } from "react";

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
};

export function AuthProvider(pros: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn() {
    const response: AuthResponse = {
      token: "123456789",
      user: {
        id: "1",
        name: "Tarcizio",
        email: "tarcizio@io.com",
      },
    };

    const { token, user } = response;

    localStorage.setItem("@painel:token", token);

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@painel:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@painel:token");

    if (token) {
      signIn();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {pros.children}
    </AuthContext.Provider>
  );
}
