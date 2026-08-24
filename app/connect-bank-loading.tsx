import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";

export default function ConnectBankLoading() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/connect-bank-success");
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#22A67A" />
      <Text style={styles.title}>Connecting Bank</Text>
      <Text style={styles.subtitle}>
        This usually takes 5 to 20 seconds. Please don't close the app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 19,
  },
});