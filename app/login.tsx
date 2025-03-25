import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "expo-router";
import LoginForm from "../components/LoginForm";
import { Text } from "react-native";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    try {
      setError(null);

      // 로그인 후 role 값을 반환받음
      const role = await login(username, password);
      
      console.log(role)
      if (role == "MEMBER") {
        router.replace("/member-tabs/home");
      } else if (role == "TRAINER") {
        router.replace("/trainer-tabs/home");
      } else {
        setError("Invalid role. Please contact support.");
      }
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <>
      {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
      <LoginForm onLogin={handleLogin} />
    </>
  );
}

