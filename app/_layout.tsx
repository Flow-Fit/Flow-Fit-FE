import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {

  const [fontsLoaded] = useFonts({
    "Pretendard": require("../assets/fonts/Pretendard.ttf"), // 🔥 폰트 파일 추가
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  return (
    
    <Stack
      screenOptions={{
        headerShown: false, // 기본 헤더 완전 제거
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "PTLINKS",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />
    </Stack>
  );
}