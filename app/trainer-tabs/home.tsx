import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from "expo-router";



export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.revenueContainer}>
        <Text style={styles.revenueText}>이번 달 수익은</Text>
        <View style={styles.revenueContent}>
          <Text style={styles.revenue}>5,400,000원</Text>
          <TouchableOpacity onPress={() => router.push("/trainer-tabs/money")}>
            <Image source={require("../../assets/images/chevron-right.png")} style={styles.chevron}/>
          </TouchableOpacity>
        </View>
        <View style={styles.sessionCnt}>
          <Text style={styles.sessionText} >1월에 진행한 세션 수</Text>
          <Text style={styles.sessionText} >35회</Text>
        </View>
      </View>

      <Text style={styles.scheduleTitle} >다음 일정 바로가기</Text>
        <View style={styles.scheduleContent}>
          <Text style={styles.scheduleText} >이건희 회원님</Text>
          <Text style={styles.scheduleTime}>오전 10:00 - 오전 11:00</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#F9F9F9",
    alignItems: "center"
  },
  revenueContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 40,
    width: "90%",
    marginTop: 15,
    borderRadius: 18,

  },
  revenueText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "400",
    color: "#939393",
  },
  revenueContent: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 25,

  },
  revenue: {
    fontFamily: "Pretendard",
    fontSize: 32,
    fontWeight: "500",


  },
  chevron: {
    width: 10,
    height: 18,
    resizeMode: "contain",
  },
  sessionCnt: {
    backgroundColor: "#F1FFFD",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 12,
    marginTop: "25%",
  },
  sessionText: {
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "500",
    color: "#2CD2BA",
  },
  scheduleTitle: {
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginTop: 40,
    marginLeft: "5%",
  },
  scheduleContent: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    width: "90%",
    padding: 13,
    height: "10%",
    borderRadius: 10,
  },
  scheduleText: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
  },
  scheduleTime: {
    fontFamily: "Pretendard",
    fontSize: 11,
    fontWeight: "500",
    color: "#939393",
  }

});