import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Content({ onLogout }: { onLogout: () => void }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Page!</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});