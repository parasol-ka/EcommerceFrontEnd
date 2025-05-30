import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    try {
      return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem('token');
    return saved && saved !== 'undefined' ? saved : null;
  });

  const isLoggedIn = !!user && !!token;

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Synchronisation locale (ex : multi-tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');

      try {
        setUser(savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null);
        setToken(savedToken && savedToken !== 'undefined' ? savedToken : null);
      } catch {
        setUser(null);
        setToken(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
