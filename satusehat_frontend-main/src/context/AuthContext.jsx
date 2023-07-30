import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  isLoading: null,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setCurrentUser(jwt_decode(storedToken));
    }

    setIsLoading(false);
  }, [setCurrentUser]);

  console.log(currentUser);

  const value = { currentUser, setCurrentUser, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
