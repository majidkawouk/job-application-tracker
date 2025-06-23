"use client";
import { createContext, useContext, useState } from "react";

// 1. Create the context
const UserContext = createContext();

// 2. Create a provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user = { id, full_name, email }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Export a custom hook for convenience
export const useUser = () => useContext(UserContext);
