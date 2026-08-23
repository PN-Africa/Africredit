import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, ChevronRight } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";

const BANKS = [
  { name: "GTBank", initials: "GT", color: "#F97316" },
  { name: "Access Bank", initials: "AB", color: "#DC2626" },
  { name: "UBA", initials: "UBA", color: "#DC2626" },
];

export default function ConnectBank() {
  const { setPendingBank } = useLoan();

  const handleSelectBank = (bankName: string) => {
    setPendingBank(bankName);
    router.push("/connect-bank-loading");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.title}>Choose your bank</Text>
      <Text style={styles.subtitle}>
        We'll securely review your transaction history to confirm your
        eligibility. We never see or store your login.
      </Text>

      <View style={styles.list}>
        {BANKS.map((bank) => (
          <Pressable
            key={bank.name}
            style={styles.bankRow}
            onPress={() => handleSelectBank(bank.name)}
          >
            <View style={[styles.bankIcon, { backgroundColor: bank.color }]}>
              <Text style={styles.bankIconText}>{bank.initials}</Text>
            </View>
            <Text style={styles.bankName}>{bank.name}</Text>
            <ChevronRight size={18} color="#9ca3af" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
    paddingHorizontal: 20,
    paddingTop: 60,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 8,
    lineHeight: 19,
  },
  list: {
    marginTop: 24,
  },
  bankRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  bankIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  bankIconText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  bankName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});