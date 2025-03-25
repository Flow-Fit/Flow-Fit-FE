import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function TrainerTabsLayout() {
  const router = useRouter();

  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#D9D9D9",
        headerShown: true, // 헤더를 보이도록 설정
        // headerStyle: {
        //   // height: 100,
        //   borderBottomWidth: 0,
        // },
        tabBarStyle: {
          height: 100,
          paddingTop: 15,
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
        // headerTitleContainerStyle: { 
        //   display: "flex",
        //   flex: 1, 
        //   width: "100%",
        //   alignItems: "center", 
        //   justifyContent: "center", 
        // },
        }} >



      <Tabs.Screen
        name="home"
        options={{
          title: "홈", 
          headerTitle: () => (
            <View style={styles.mainContainer}>
            <Image
              source={require("../../assets/images/logoBlack.png")}
              style={styles.logoImg} />
            <TouchableOpacity onPress={() => router.push("/trainer-tabs/notice")} style={styles.noticeCtn}>
              <Image
                source={require("../../assets/images/notice.png")}
                style={styles.notice} />
            </TouchableOpacity>           
            </View>
          ),
          headerStyle: {
            height: 140,
            borderBottomWidth: 0,
          },
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trainer-schedule"
        options={{
          title: "일정",
          headerTitle: () => (
            <View>
              <Text style={styles.homeTitle}>플로우 캘린더</Text> 
            </View>
          ),
          headerTitleContainerStyle: { 
            display: "flex",
            flex: 1, 
            alignItems: "center", 
            justifyContent: "flex-end", 
          },
          headerStyle: {
            height: 100,
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center", 
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: "회원",
          headerTitle: () => (
            <View>
              <Text style={styles.homeTitle}>회원 관리</Text>
            </View>
          ),
          headerTitleContainerStyle: { 
            display: "flex",
            flex: 1, 
            alignItems: "center", 
            justifyContent: "flex-end", 
          },
          headerStyle: {
            height: 100,
            borderBottomWidth: 0,
            display: "flex",
            flexDirection: "row",
          },
          headerTitleAlign: "center", 
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={30} color={color} />,
        }}
      />
        <Tabs.Screen
        name="money"
        options={{
          title: "정산",
          headerTitle: () => (
            <View>
              <Text style={styles.homeTitle}>급여 정산</Text>
            </View>
          ),
          headerTitleContainerStyle: { 
            display: "flex",
            flex: 1, 
            alignItems: "center", 
            justifyContent: "flex-end", 
          },
          headerStyle: {
            height: 100,
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center", 
          tabBarIcon: ({ color, size }) => <Ionicons name="calculator" size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoImg: {
    marginLeft: 20, 
    width: 120, 
    height: 40, 
    resizeMode: "contain", 
    marginTop: 55,
  },
  noticeCtn: {
    marginTop: 55,
    marginLeft: "100%",
    paddingLeft: 20,
  },
  notice: {
    width: 23,
    height: 22,
  },
  // my: {
  //   fontFamily: "Paperlogy",
  //   fontSize: 20,
  //   fontWeight: "500",
  //   marginTop: 55,
  //   marginLeft: "100%",
  //   paddingLeft: 10,
    
  // },
  homeTitle: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "500",
    paddingBottom: 15,
  },



})