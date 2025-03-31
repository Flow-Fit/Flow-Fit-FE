import React, { useState } from "react";
import { useRouter } from "expo-router";
import DatePicker from "react-native-date-picker";
import { View, Image, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [birthOpen, setBirthOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("MEMBER"); // 기본값: MEMBER
  const [loading, setLoading] = useState(false);



  const handleSignUp = async () => {
    const userData = {
      role,
      username,
      password,
      // email,
      name,
      birth: birth.toISOString().split("T"), 
      phoneNumber,
    };

    try {
      setLoading(true);

      const response = await fetch("https://flowfit.kro.kr/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to sign up");
        return;
      }

      Alert.alert("Success", "You have successfully signed up!");
      router.replace("/");
    } catch (error) {
      console.error("SignUp Error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* header */}
      <View style={styles.header}>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Image source={require("../assets/images/chevron-left.png")} style={styles.chevron} />
              </TouchableOpacity>
              <Text style={styles.headerText}>회원가입</Text>
      </View>


      {/* role select section */}
      <View style={styles.roleContainer}>
      <TouchableOpacity
          style={[styles.roleButton, role === "TRAINER" && styles.selectedRoleButton]}
          onPress={() => setRole("TRAINER")}
        >
          <Text style={[styles.roleText, role === "TRAINER" && styles.selectedRoleText]}>트레이너</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === "MEMBER" && styles.selectedRoleButton]}
          onPress={() => setRole("MEMBER")}
        >
          <Text style={[styles.roleText, role === "MEMBER" && styles.selectedRoleText]}>회원</Text>
        </TouchableOpacity>        
      </View>


      {/* signin input section */}
      {/* id */}
      <View style={styles.inputContainer}>
        <View style={styles.inputSection }>
          <Text style={styles.textStyle}>아이디</Text>
          <View style={styles.inputRowLayout }>
            <TextInput
            style={styles.input}
            placeholderTextColor="#939393"
            value={username}
            onChangeText={setUsername}
            />
            <TouchableOpacity  style={styles.duplicateBtn} onPress={() => {}}>중복 확인</TouchableOpacity>

          </View>
          <Text style={styles.subTextStyle}>
            영문 소문자와 숫자만 사용하여 아이디를 입력해주세요.
          </Text>
        </View>

        {/* password */}
        <View style={styles.inputSection }>
          <Text style={styles.textStyle}>비밀번호</Text>
          <View>
            <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#939393"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            placeholderTextColor="#939393"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
          </View>
          <Text style={styles.subTextStyle}>
            영문 대문자와 소문자, 숫자, 특수문자 중 
            2가지 이상을 조합하여 8자 이상으로 {"\n"}작성해주세요.
          </Text>
        </View>

        {/* name */}
        <View style={styles.inputRowSection }>
          <Text style={styles.textStyle}>이름</Text>
          <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          />
        </View>

        {/* birth */}
        <View style={styles.inputRowSection }>
          <Text style={styles.textStyle}>생년월일</Text>
          {/* <TextInput
            style={styles.input}
            placeholder="YYYY-MM-dd"
            placeholderTextColor="#939393"
            value={birth}
            onChangeText={setBirth}
            keyboardType="numeric"
          /> */}
          <TouchableOpacity onPress={() => setBirthOpen(true)}>
        <Text >
          {birth.toISOString().split("T")[0]} {/* YYYY-MM-DD 형식으로 표시 */}
        </Text>
      </TouchableOpacity>
      <DatePicker
          modal
          open={birthOpen} 
          date={birth}
          mode="date" 
          locale="ko" 
          maximumDate={new Date()} 
          onConfirm={(date) => {
            setBirthOpen(false); // ✅ 수정: 모달 닫기
            setBirth(date);
          }}
          onCancel={() => {
            setBirthOpen(false); // ✅ 수정: 모달 닫기
          }}
        />
        </View>

        {/* phone number */}
        <View style={styles.inputRowSection }>
          <Text style={styles.textStyle}>휴대폰 번호</Text>
          <View style={styles.inputColumSection}>
              <TextInput
                style={styles.input}
                placeholder="- 없이 입력"
                placeholderTextColor="#939393"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <TouchableOpacity>인증번호 요청</TouchableOpacity>
            </View>           
        </View>
      </View>
      
      {/* signin button */}
      <TouchableOpacity style={styles.signinBtn} onPress={handleSignUp} disabled={loading}>가입하기</TouchableOpacity>
    </View>
  );
}



// styleSheet side
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    marginLeft: "35%"
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  roleContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#D9D9D9",
  },
  selectedRoleButton: {
    borderColor: "transparent",
    borderBottomWidth: 5,
    borderBottomColor: "#000",
  },
  roleText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#D9D9D9",
  },
  selectedRoleText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 25,
    marginTop: 30,
  },
  inputSection: {
    marginBottom: 25,
  },
  inputRowSection: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    
  },
  inputRowLayout:{
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  inputColumScetion: {
    width: "100%",

  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#F9F9F9",
    borderRadius: 7,
  },
  textStyle: {
    fontFamily: "Pretendard",
    color: "#000", 
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
    width: "30%",
    // height: 20,
    // marginLeft: "38%"
  },
  subTextStyle: {
    fontFamily: "Pretendard",
    color: "#2CD2BA", 
    fontWeight: "300",
    fontSize: 10,
    // marginTop: 5,
  },
  duplicateBtn: {
    width: 100, 
    height: 38,
    marginLeft: 10,
    backgroundColor: "#F5F5F5",
    color: "#B0B0B0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  signinBtn: {
    height: 60,
    backgroundColor: "#E2E2E2",
    color: "#8F8F8F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "500",
    margin: 25,
    marginTop: "45%",
  },
});