import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

const PHONE_REGEX = /[^0-9\s]/g;

export default function ForgotPasswordStep1() {
  const [phone, setPhone] = useState("234 345 4567");

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(PHONE_REGEX, ""));
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.stepLabel}>Reset Password  •  Step 1 of 3</Text>
      <Text style={styles.title}>Let's find your account</Text>
      <Text style={styles.subtitle}>
        Confirm the phone number on your account. We'll text you a code to
        reset your password.
      </Text>

      <Text style={styles.label}>Phone number</Text>
      <View style={styles.inputRow}>
        <Text style={styles.prefix}>+234</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          maxLength={13}
        />
      </View>

      <View style={{ flex: 1 }} />

      <Pressable
        style={styles.button}
        onPress={() => router.push("/forgot-password-verify")}
      >
        <Text style={styles.buttonText}>Send code</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  stepLabel: {
    color: "#22A67A",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 28,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  prefix: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
  },
  button: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});