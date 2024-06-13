import { getCurrentUser } from "@/lib/appwrite";
import { AppwriteUser } from "@/lib/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";
import { Models } from "react-native-appwrite";

type AppProviderProps = {
  children: React.ReactNode;
};

type AppProviderState = {
  isFirstLaunched: boolean;
  setIsFirstLaunched: (isFirstLaunched: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: AppwriteUser | null;
  setUser: (user: AppwriteUser | null) => void;
  isLoading: boolean;
};

const initialState: AppProviderState = {
  isFirstLaunched: true,
  setIsFirstLaunched: () => null,
  isLoggedIn: false,
  setIsLoggedIn: () => null,
  user: null,
  setUser: () => null,
  isLoading: true,
};

const AppContext = createContext<AppProviderState>(initialState);

export const AppProvider = ({ children, ...props }: AppProviderProps) => {
  const [isFirstLaunched, setIsFirstLaunched] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res || null);
        setIsLoggedIn(!!res);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const value = {
    isFirstLaunched,
    setIsFirstLaunched: (isFirstLaunched: boolean) => {
      setIsFirstLaunched(isFirstLaunched);
    },
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    isLoading,
  };
  return (
    <AppContext.Provider {...props} value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
