import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { Link, router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import logo from "../../assets/images/africredit-logo.png";

const PHONE_REGEX = /[^0-9\s]/g;

export default function SignIn() {
  const [phone, setPhone] = useState("234 345 4567");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(PHONE_REGEX, ""));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.tagline}>Just a smarter way to borrow</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Log in to check your loan status and manage repayments.
        </Text>

        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          placeholder="234 345 4567"
          placeholderTextColor="#9ca3af"
          maxLength={13}
        />

        <Text style={styles.label}>Password</Text>
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

        <Link href="/forgot-password" asChild>
          <Pressable>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </Pressable>
        </Link>

        <Pressable
          style={styles.loginButton}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>New to AfriCredit? </Text>
          <Link href="/login" asChild>
            <Pressable>
              <Text style={styles.signupLink}>Create an account</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
  },
  logoSection: {
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 60,
  },
  logo: {
    width: 383,
    height: 234,
  },
  tagline: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: -8,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    marginBottom: 18,
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
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#22A67A",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signupText: {
    color: "#6b7280",
    fontSize: 13,
  },
  signupLink: {
    color: "#22A67A",
    fontSize: 13,
    fontWeight: "700",
  },
});