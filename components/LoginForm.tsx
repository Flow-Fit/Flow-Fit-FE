import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useWindowDimensions, View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onLogin(username, password); // 상위 컴포넌트로 데이터 전달
  };
  const router = useRouter();

  const { width, height } = useWindowDimensions();
  const isSmallScreen = height < 750;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image source={require("../assets/images/chevron-left.png")} style={styles.chevron} />
        </TouchableOpacity>
        <Text style={styles.headerText}>로그인</Text>
      </View>
      <View style={styles.logoSection}>
        <Text style={styles.logoText}>트레이너를 위한 {"\n"}맞춤 회원관리 솔루션</Text>
        <Image source={require("../assets/images/logoBlack.png")} style={styles.logo} />
      </View>

      <View style={styles.login}>
        <TextInput
          style={styles.input}
          placeholder="아이디 입력"
          placeholderTextColor="#939393"
          value={username}
          keyboardType = "default"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 입력"
          placeholderTextColor="#939393"
          value={password}
          keyboardType = "default"
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={() => router.push("/signup")} style={styles.signIn}>회원가입</TouchableOpacity>


      </View>
      <TouchableOpacity style={isSmallScreen ? styles.smallLoginBtn : styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>로그인하기</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    width: "100%",
    marginTop: 60,
    display: "flex",
    flexDirection: "row",
    // alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  chevron: {
    height: 19, 
    width: 12,
    resizeMode: "contain",
    marginLeft: 10,
  },
  headerText: {
    fontFamily: "Pretendard",
    color: "#000", 
    fontWeight: "600",
    fontSize: 20,
    height: 20,
    marginLeft: "38%"
  },
  logoSection: {
    marginTop: 80,
    paddingHorizontal: 40,
    alignItems: "flex-start",
    
  },
  logoText: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "500",
  },
  logo: {
    width: 172,
    height: 46,
    resizeMode: "contain",
  },
  login:{
    marginTop: 120,
    alignItems: "center",
  },
  signIn: {
    marginTop: 25,
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "400",
    color: "#939393",
  },
  input: {
    width: "85%",
    height: 50,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    backgroundColor: "#F9F9F9",
    borderColor: "transparent",
    borderRadius: 5,
  },
  loginButton: {
    width: "85%",
    padding: 20,
    backgroundColor: "#000",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 9,
    marginTop: "40%",
  },
  smallLoginBtn: {
    width: "85%",
    padding: 20,
    backgroundColor: "#000",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 9,
    marginTop: "10%",
  },
  buttonText: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});