import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import React from "react";

export default function MemberTabsLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#D9D9D9",
        headerShown: true, // 헤더를 보이도록 설정
        headerStyle: {
          height: 140,
          borderBottomWidth: 0,
        },
        tabBarStyle: {
          height: 100,
          paddingTop: 20,
        },
        tabBarItemStyle: {
          // justifyContent: "center",
          alignContent: "center",
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: "Pretendard",
          marginTop: 5,

        },
        headerTitle: () => (
          <Image
            source={require("../../assets/images/logoBlack.png")} // 앱의 로고 이미지 경로
            style={{ marginLeft: 20, width: 120, height: 40, resizeMode: "contain", marginTop: 55, }} // 적절한 크기로 조정
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}