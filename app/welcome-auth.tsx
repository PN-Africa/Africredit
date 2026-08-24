import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import welcomeImg from "../assets/images/africredit-logo.png";

export default function WelcomeAuth() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>

      <View style={styles.content}>
        <Image source={welcomeImg} style={styles.logo} resizeMode="contain" />
        <Text style={styles.tagline}>Just a smarter way to borrow</Text>
      </View>
      <View style={styles.sheet}>
        <Pressable
          style={styles.signUpButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </Pressable>
        <Pressable
          style={styles.loginButton}
          onPress={() => router.push("/signin")}
        >
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF2",
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#16294D",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  backText: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 383,
    height: 234,
    opacity: 0.35,
  },
  tagline: {
    color: "#6b7280",
    fontSize: 16,
    marginTop: 4,
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#00000010",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
    gap: 14,
  },
  signUpButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: "center",
  },
  signUpText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  loginButton: {
    backgroundColor: "#16294D",
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: "center",
  },
  loginText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});