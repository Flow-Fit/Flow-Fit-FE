import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 상단 이미지 추가 */}
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/signup")}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* 카카오톡 로그인 버튼 */}
      <View style={styles.kakaoButtonContainer}>
        <TouchableOpacity
          style={styles.kakaoButton}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.kakaoButtonText}>카카오톡 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000", // 🔥 배경색 검은색으로 변경
  },
  logo: {
    width: 150, // 이미지 크기 조절
    height: 150,
    resizeMode: "contain",
    marginBottom: 40, // 버튼들과 간격 조절
  },
  buttonContainer: {
    width: "100%", 
    alignItems: "center",
    marginBottom: 20, // 버튼 그룹과 카카오 버튼 사이 여백
  },
  button: {
    backgroundColor: "#1E90FF", // 파란색 버튼 (어두운 배경에서 잘 보이게)
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%", // 버튼 크기 조정
    marginVertical: 8, // 버튼 간격
  },
  buttonText: {
    color: "#fff", // 흰색 텍스트 (어두운 배경에서 가독성 높임)
    fontWeight: "bold",
    fontSize: 18,
  },
  kakaoButtonContainer: {
    width: "100%",
    alignItems: "center", // 가운데 정렬
  },
  kakaoButton: {
    backgroundColor: "#FEE500", // 카카오톡 공식 색상
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%", // 버튼 크기 조정
  },
  kakaoButtonText: {
    color: "#3C1E1E", // 카카오 브라운 컬러 (텍스트 색상)
    fontWeight: "bold",
    fontSize: 18,
  },
});