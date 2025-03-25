import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from "expo-router";

export default function Screen() {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
      <TouchableOpacity  >
        <Image
          source={require("../../assets/images/search.png")}
          style={styles.search} />
      </TouchableOpacity>

      </View>

      <View style={styles.memberSection}>
        <TouchableOpacity style={styles.memberCtn} >
          <Text style={styles.name}>이건희</Text>
          <Text style={styles.sectionCount}>5회 미만</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.memberCtn}>
          <Text style={styles.name}>이건희</Text>
          <Text style={styles.sectionCount}>5회 미만</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.memberCtn}>
          <Text style={styles.name}>이건희</Text>
          <Text style={styles.sectionCount}>5회 미만</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addMember}>
      <Image
          source={require("../../assets/images/addMember.png")}
          style={styles.addMember} />
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 15,

  },
  search: {
    width: 21,
    height: 21,
    alignSelf: "flex-end",
    marginRight: 25,
  },
  memberSection: {

  },
  memberCtn: {
    backgroundColor: "#FFFFFF",
    height: 70,
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    
  },
  name: {
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "500",
  },
  sectionCount: {
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#F1FFFD",
    color: "#2CD2BA",
    padding: 10,
    borderRadius: 5,

  },
  addMember: {
    width: 55,
    height: 55,
    alignSelf: "flex-end",
    margin: 10,
    position: "absolute",
    bottom: 0,
  },

});