import React, { createContext, useState, useContext, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho userData
interface UserData {
  id: string | null;
  userId: string | null;
  fullName: string | null;
  department: string | null;
  email: string | null;
  phoneNumber: string | null;
}

// Định nghĩa kiểu dữ liệu cho AuthContext
interface AuthContextType {
  userData: UserData;
  setInfoUser: (userData: UserData) => void;
  logout: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

// Tạo ngữ cảnh với kiểu dữ liệu xác định
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

  const setInfoUser = (userData: UserData) => {
    setUserData(userData);
  };

  const logout = () => {
    setUserData({
      id: null,
      userId: null,
      fullName: null,
      department: null,
      email: null,
      phoneNumber: null,
    });
    setToken(null); // Đặt token thành null khi logout
  };

  return (
    <AuthContext.Provider
      value={{ userData, setInfoUser, logout, token, setToken }}
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
