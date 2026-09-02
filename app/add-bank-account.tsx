import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft, ChevronRight, Check } from "lucide-react-native";
import { useProfile } from "../contexts/ProfileContext";

const BANKS = [
  { name: "GTBank", initials: "GT", color: "#F97316" },
  { name: "Access Bank", initials: "AB", color: "#DC2626" },
  { name: "UBA", initials: "UBA", color: "#DC2626" },
];

type Stage = "select" | "loading" | "success";

export default function AddBankAccount() {
  const { addBankAccount } = useProfile();
  const [stage, setStage] = useState<Stage>("select");
  const [selectedBank, setSelectedBank] = useState("");

  const handleSelectBank = (bankName: string) => {
    setSelectedBank(bankName);
    setStage("loading");
    setTimeout(() => {
      addBankAccount(bankName);
      setStage("success");
    }, 1800);
  };

  if (stage === "loading") {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#22A67A" />
        <Text style={styles.loadingTitle}>Connecting Bank</Text>
        <Text style={styles.loadingSubtitle}>
          This usually takes 5 to 20 seconds. Please don't close the app.
        </Text>
      </View>
    );
  }

  if (stage === "success") {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.checkCircle}>
          <Check size={32} color="#22A67A" strokeWidth={3} />
        </View>
        <Text style={styles.loadingTitle}>{selectedBank} connected</Text>
        <Text style={styles.loadingSubtitle}>
          Your account has been added to your linked banks
        </Text>
        <Pressable
          style={styles.doneButton}
          onPress={() => router.replace("/bank-accounts")}
        >
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </View>
    );
  }

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
  centerContainer: {
    flex: 1,
    backgroundColor: "#FAF3EA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
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
  loadingTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    textAlign: "center",
  },
  loadingSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 19,
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E3F5EC",
    alignItems: "center",
    justifyContent: "center",
  },
  doneButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: "center",
    marginTop: 24,
    width: "100%",
  },
  doneText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});