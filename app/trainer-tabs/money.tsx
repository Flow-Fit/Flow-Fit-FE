import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Screen() {
  return (
    <View style={styles.container}>
      <View style={styles.selectSection}>
        <TouchableOpacity  >
          <Image
            source={require("../../assets/images/chevron-left.png")}
            style={styles.chevron}/>
        </TouchableOpacity>
        <Text style={styles.selectText}>2025년 2월</Text>
        <TouchableOpacity >
          <Image
            source={require("../../assets/images/chevron-right.png")}
            style={styles.chevron}/>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  selectSection: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 5,
  },
  selectText: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "500",
  },
  chevron: {
    width: 18,
    height: 15,
    resizeMode: "contain",
    marginTop: 5,
    

  },

});