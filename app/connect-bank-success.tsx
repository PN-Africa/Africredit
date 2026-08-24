import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Check } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";

export default function ConnectBankSuccess() {
  const { pendingBank, connectBank } = useLoan();

  const handleDone = () => {
    connectBank(pendingBank);
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Check size={32} color="#22A67A" strokeWidth={3} />
        </View>
        <Text style={styles.title}>{pendingBank} connected</Text>
        <Text style={styles.subtitle}>
          Your transaction history will now count towards your eligibility
        </Text>
      </View>

      <Pressable style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneText}>Done</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E3F5EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 20,
    lineHeight: 19,
  },
  doneButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  doneText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});