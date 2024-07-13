// AuthContext.js
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the AuthContext value
interface AuthContextType {
  isLoggedIn: () => boolean;
  login: () => void;
  logout: () => void;
}

// Create a default value for the AuthContext
const defaultAuthContext: AuthContextType = {
  isLoggedIn: () => false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Simulate a login check (replace with real authentication logic)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  const login = () => {
    // Simulate a login (replace with real login logic)
    localStorage.setItem('user', 'true');
    setLoggedIn(true);
  };

  const logout = () => {
    // Simulate a logout (replace with real logout logic)
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const isLoggedIn = () => loggedIn;
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);