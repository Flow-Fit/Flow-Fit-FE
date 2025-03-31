import React from "react";
import { useWindowDimensions, View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";


export default function Layout() {
  const router = useRouter();
  
  const { width, height } = useWindowDimensions();
  const isSmallScreen = height < 750;

  return (
    <View style={styles.container}>
      {/* 상단 이미지 추가 */}
      <Image source={require("../assets/images/logo.png")} style={isSmallScreen ? styles.smallScreenLayout : styles.logo} />

      {/* 카카오톡 로그인 버튼 */}
      <View style={styles.kakaoButtonContainer}>
        <TouchableOpacity
          style={styles.kakaoButton}
          onPress={() => router.push("/signup")}
        >
          <Image source={require("../assets/images/kakaoLogo.png")} style={styles.kakaoLogo} />
          <Text style={styles.kakaoButtonText}>카카오톡으로 시작하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>아이디로 로그인</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 14, color: "#fff", marginHorizontal: 10 }}>/</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/signup")}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000", // 배경색 검은색으로 변경
  },
  logo: {
    width: 150, // 이미지 크기 조절
    height: 150,
    resizeMode: "contain",
    marginTop: 245,
    marginBottom: "55%",
  },
  smallScreenLayout: {
    marginBottom: "35%",
    width: 150, 
    height: 150,
    resizeMode: "contain",
    marginTop: 180,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    // width: "100%", 
    alignItems: "center",
    marginBottom: 20,
    gap: 5, 
  },
  button: {
    backgroundColor: "transparent", // 파란색 버튼 (어두운 배경에서 잘 보이게)
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 8, // 버튼 간격
  },
  buttonText: {
    fontFamily: "Pretendard",
    color: "#FFFFFF",
    fontWeight: "500",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  kakaoButtonContainer: {
    width: "100%",
    alignItems: "center", // 가운데 정렬
  },
  kakaoButton: {    
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FEE500", // 카카오톡 공식 색상
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "75%", 
    paddingTop: 20,
    paddingBottom: 20,
  },
  kakaoLogo: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 20

  },
  kakaoButtonText: {
    fontFamily: "Pretendard",
    color: "#3C1E1E", // 카카오 브라운 컬러 (텍스트 색상)
    fontWeight: "bold",
    fontSize: 16,
    height: 20,

  },
});