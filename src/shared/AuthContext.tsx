import { createContext, useState, useEffect } from "react";

const initialState = {
  isAuthenticated: null,
  loading: false,
  user: null,
};

interface AppContextInterface {
  isAuthenticated: boolean | null;
  loading: boolean;
  setIsAuthenticated?: (value: boolean) => void;
  setLoading?: (value: boolean) => void;
  user: any;
}

export const AuthContext = createContext<AppContextInterface>(initialState);
interface AuthProviderI {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderI) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // null represents the initial loading state
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>();
  useEffect(() => {
    // Simulate an asynchronous check for authentication
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Update the authentication status based on the presence of a token
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
