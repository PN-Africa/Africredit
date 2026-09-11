import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AccountCreated() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Success icon */}
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark" size={48} color="#20A879" />
      </View>

      {/* Text */}
      <Text style={styles.title}>Account Created</Text>

      <Text style={styles.description}>
        Your account has been created successfully.Continue to
        {"\n"}verify your identify
      </Text>

      {/* Buttons */}
      <View style={styles.buttons}>
        <Pressable
          style={styles.verifyButton}
          onPress={() => router.push("./verify-identity")}
        >
          <Text style={styles.verifyText}>Verify Identity</Text>
        </Pressable>

        <Pressable
          style={styles.skipButton}
          onPress={() => router.push("/signin")}
        >
          <Text style={styles.skipText}>Skip Verification</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingTop: 100,
  },

  iconCircle: {
    width: 145,
    height: 145,
    borderRadius: 75,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    fontSize: 20,
    lineHeight: 28,
    color: "#777777",
    textAlign: "center",
    marginBottom: 45,
  },

  buttons: {
    width: "100%",
  },

  verifyButton: {
    height: 82,
    backgroundColor: "#27AE83",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  verifyText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  skipButton: {
    height: 82,
    backgroundColor: "#FFFDF8",
    borderWidth: 2,
    borderColor: "#E5E1D8",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  skipText: {
    color: "#555555",
    fontSize: 22,
    fontWeight: "700",
  },
});
