import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: { fullName: string } | null;
  login: (token: string, fullName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ fullName: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token && userName) {
      setUser({ fullName: userName });
    }
  }, []);

  const login = (token: string, fullName: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", fullName);
    setUser({ fullName });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
