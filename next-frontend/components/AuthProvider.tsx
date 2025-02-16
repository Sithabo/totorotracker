"use client";
import { getUser } from "@/api/user";
import { useContext, createContext, useState, useEffect } from "react";

interface User {
  id: string | null;
  email: string;
  username: string;
  password: string;
}

interface AuthContextType {
  user: User;
  setUser: (value: User) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({
    id: null,
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(true); // New state to track loading

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getUser();
        if (data instanceof Error) {
          setIsAuthenticated(false);
        } else {
          setUser(data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
      setLoading(false); // Stop loading
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
