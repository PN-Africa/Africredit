import { useRef, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

const DIGIT_REGEX = /[^0-9]/g;

export default function ForgotPasswordStep2() {
  const [code, setCode] = useState(["4", "4", "4", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (value: string, index: number) => {
    const digitOnly = value.replace(DIGIT_REGEX, "").slice(-1);
    const next = [...code];
    next[index] = digitOnly;
    setCode(next);
    if (digitOnly && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.stepLabel}>Reset Password  •  Step 2 of 3</Text>
      <Text style={styles.title}>Enter the 6-digit code</Text>
      <Text style={styles.subtitle}>Sent to +234 234 234 2345</Text>

      <View style={styles.codeRow}>
        {code.map((digit, i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputRefs.current[i] = ref)}
            style={styles.codeInput}
            value={digit}
            onChangeText={(v) => handleChange(v, i)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <Text style={styles.resendText}>
        Didn't get it? Resend code in{" "}
        <Text style={styles.resendTimer}>00:30</Text>
      </Text>

      <View style={{ flex: 1 }} />

      <Pressable
        style={styles.button}
        onPress={() => router.push("/forgot-password-reset")}
      >
        <Text style={styles.buttonText}>Verify</Text>
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
    marginBottom: 24,
  },
  codeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  codeInput: {
    width: 48,
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  resendText: {
    fontSize: 13,
    color: "#6b7280",
  },
  resendTimer: {
    color: "#22A67A",
    fontWeight: "700",
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