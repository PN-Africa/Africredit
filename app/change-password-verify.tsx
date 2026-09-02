import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react-native";

const PASSWORD_REGEX = /^(?=.*[0-9]).{8,}$/;

export default function ChangePasswordStep2() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isStrong = PASSWORD_REGEX.test(password);
  const isMatch = confirmPassword.length > 0 && confirmPassword === password;
  const canSubmit = isStrong && isMatch;

  const handleChangePassword = () => {
    if (!canSubmit) return;
    router.push("/change-password-success");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.stepLabel}>Change Password  •  Step 2 of 2</Text>
      <Text style={styles.title}>Create a new password</Text>
      <Text style={styles.subtitle}>
        Use at least 8 characters and a number. Make it different from the
        old one.
      </Text>

      <Text style={styles.label}>New Password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter a password"
          placeholderTextColor="#9ca3af"
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword((v) => !v)}>
          {showPassword ? (
            <EyeOff size={20} color="#6b7280" />
          ) : (
            <Eye size={20} color="#6b7280" />
          )}
        </Pressable>
      </View>
      {password.length > 0 && (
        <Text
          style={[
            styles.helperText,
            { color: isStrong ? "#22A67A" : "#D97706" },
          ]}
        >
          {isStrong ? "Strong password" : "Use 8+ characters with a number"}
        </Text>
      )}

      <Text style={[styles.label, { marginTop: 18 }]}>
        Confirm new password
      </Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={styles.passwordInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Enter a password"
          placeholderTextColor="#9ca3af"
          secureTextEntry={!showConfirm}
        />
        <Pressable onPress={() => setShowConfirm((v) => !v)}>
          {showConfirm ? (
            <EyeOff size={20} color="#6b7280" />
          ) : (
            <Eye size={20} color="#6b7280" />
          )}
        </Pressable>
      </View>
      {confirmPassword.length > 0 && (
        <Text
          style={[
            styles.helperText,
            { color: isMatch ? "#22A67A" : "#DC2626" },
          ]}
        >
          {isMatch ? "Password match" : "Passwords don't match"}
        </Text>
      )}

      <View style={styles.noticeBox}>
        <Lock size={16} color="#22A67A" style={{ marginTop: 2 }} />
        <Text style={styles.noticeText}>
          You will be logged out of all other devices once your password is
          changed.
        </Text>
      </View>

      <View style={{ flex: 1 }} />

      <Pressable
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={handleChangePassword}
        disabled={!canSubmit}
      >
        <Text style={styles.buttonText}>Change password</Text>
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
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  helperText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  noticeBox: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#E3F5EC",
    borderRadius: 10,
    padding: 14,
    marginTop: 24,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: "#374151",
    lineHeight: 17,
  },
  button: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A7D9C4",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});