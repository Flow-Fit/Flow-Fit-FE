import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("MEMBER"); // 기본값: MEMBER
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const userData = {
      username,
      password,
      email,
      name,
      role,
    };

    try {
      setLoading(true);

      const response = await fetch("http://43.203.255.109/api/user", {
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
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      {/* Role Selection */}
      <Text style={styles.label}>Select Role:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === "MEMBER" && styles.selectedRoleButton]}
          onPress={() => setRole("MEMBER")}
        >
          <Text style={[styles.roleText, role === "MEMBER" && styles.selectedRoleText]}>Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === "TRAINER" && styles.selectedRoleButton]}
          onPress={() => setRole("TRAINER")}
        >
          <Text style={[styles.roleText, role === "TRAINER" && styles.selectedRoleText]}>Trainer</Text>
        </TouchableOpacity>
      </View>

      <Button title={loading ? "Loading..." : "Sign Up"} onPress={handleSignUp} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: "80%",
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "80%",
  },
  roleButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRoleButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  roleText: {
    fontSize: 16,
    color: "#333",
  },
  selectedRoleText: {
    color: "#fff",
    fontWeight: "bold",
  },
});