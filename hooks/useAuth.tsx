import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchNoAuth } from "../utils/apiClient";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [role, setRole] = useState<"TRAINER" | "MEMBER" | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // 로그인 함수
  const login = async (username: string, password: string) => {
    try {
      const response = await fetchNoAuth("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response;
      console.log(data)

      // AsyncStorage에 토큰과 role 저장
      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem("userRole", data.user.role);

      setToken(data.token);
      setRole(data.user.role);
      setIsLoggedIn(true);

      return data.user.role; // 로그인 후 role 반환
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Login failed");
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userRole");
      setToken(null);
      setRole(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // 초기 상태 복원
  useEffect(() => {
    const restoreAuthState = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        const storedRole = await AsyncStorage.getItem("userRole");

        if (storedToken && storedRole) {
          setToken(storedToken);
          setRole(storedRole as "TRAINER" | "MEMBER");
          setIsLoggedIn(true);
        } else {
          setToken(null);
          setRole(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to restore auth state", error);
        setToken(null);
        setRole(null);
        setIsLoggedIn(false);
      }
    };

    restoreAuthState();
  }, []);

  return { isLoggedIn, login, logout, token, role };
}