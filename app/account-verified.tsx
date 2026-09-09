import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AccountVerified() {
  const router = useRouter();

  const handleDone = () => {
    // We can change this destination later
    // when we connect the verification flow
    router.push("/profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successCircle}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        {/* Success Text */}
        <Text style={styles.title}>Account Verified</Text>

        <Text style={styles.subtitle}>
          Your account has been verified successfully
        </Text>
      </View>

      {/* Done Button */}
      <Pressable style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
    paddingHorizontal: 24,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },

  successCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "#E3F0EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },

  checkmark: {
    fontSize: 52,
    color: "#2F9B7D",
    fontWeight: "400",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1F2328",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    color: "#737373",
    textAlign: "center",
    lineHeight: 25,
    paddingHorizontal: 25,
  },

  doneButton: {
    height: 58,
    backgroundColor: "#2F9B7D",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
