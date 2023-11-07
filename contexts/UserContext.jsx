import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userState: [user, setUser],
        userAuth: [userAuthenticated, setUserAuthenticated],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};