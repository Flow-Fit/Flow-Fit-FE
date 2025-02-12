import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import React from "react";

export default function TrainerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        headerShown: true, // 헤더를 보이도록 설정
        headerTitle: () => (
          <Image
            source={require("../../assets/images/logo2.png")} // 앱의 로고 이미지 경로
            style={{ marginLeft: 30, width: 120, height: 40, resizeMode: "contain" }} // 적절한 크기로 조정
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trainer-schedule"
        options={{
          title: "일정",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: "회원",
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />
       <Tabs.Screen
        name="money"
        options={{
          title: "정산",
          tabBarIcon: ({ color, size }) => <Ionicons name="calculator" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}