import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  id: string | null;
  userId: string | null;
  fullName: string | null;
  department: string | null;
  email: string | null;
  phoneNumber: string | null;
}

interface AuthContextType {
  userData: UserData;
  setUserData: (userData: UserData) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    id: null,
    userId: null,
    fullName: null,
    department: null,
    email: null,
    phoneNumber: null,
  });

  const setInfoUser = (newUserData: UserData) => {
    setUserData(newUserData);
  };

  // Lưu trạng thái đăng nhập
  const saveLoggedInState = async (token: any) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", token ? "true" : "false");
    } catch (error) {
      console.error("Error saving login state:", error);
    }
  };

  // Kiểm tra trạng thái đăng nhập
  const checkLoggedInState = async () => {
    try {
      const token = await AsyncStorage.getItem("isLoggedIn");
      return token === "true";
    } catch (error) {
      console.error("Error checking login state:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ userData, setUserData: setInfoUser, token, setToken }}
    >
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
