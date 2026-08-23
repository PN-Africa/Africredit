import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";
import { formatCurrency } from "../lib/loanMath";

const QUICK_AMOUNTS = [50000, 100000, 250000];
const MAX_AMOUNT = 350000;
const DURATIONS = [1, 3, 6, 12];
const AMOUNT_REGEX = /[^0-9]/g;

export default function ApplyLoanAmount() {
  const { application, setApplication } = useLoan();
  const [amount, setAmount] = useState(application?.amount ?? 250000);
  const [purpose, setPurpose] = useState(application?.purpose ?? "");
  const [duration, setDuration] = useState(application?.durationMonths ?? 1);

  const handleAmountChange = (value: string) => {
    const digits = value.replace(AMOUNT_REGEX, "");
    setAmount(digits ? Math.min(Number(digits), MAX_AMOUNT) : 0);
  };

  const handleContinue = () => {
    if (amount <= 0 || !purpose.trim()) return;
    setApplication({ amount, purpose: purpose.trim(), durationMonths: duration });
    router.push("/apply-loan-terms");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.eligibleText}>
        You're eligible for up to N350,000
      </Text>
      <Text style={styles.label}>How much do you need?</Text>

      <TextInput
        style={styles.amountInput}
        value={formatCurrency(amount)}
        onChangeText={handleAmountChange}
        keyboardType="number-pad"
      />

      <View style={styles.quickRow}>
        {QUICK_AMOUNTS.map((val) => (
          <Pressable
            key={val}
            style={[styles.quickChip, amount === val && styles.quickChipActive]}
            onPress={() => setAmount(val)}
          >
            <Text
              style={[
                styles.quickChipText,
                amount === val && styles.quickChipTextActive,
              ]}
            >
              {formatCurrency(val)}
            </Text>
          </Pressable>
        ))}
        <Pressable
          style={[styles.quickChip, amount === MAX_AMOUNT && styles.quickChipActive]}
          onPress={() => setAmount(MAX_AMOUNT)}
        >
          <Text
            style={[
              styles.quickChipText,
              amount === MAX_AMOUNT && styles.quickChipTextActive,
            ]}
          >
            Max
          </Text>
        </Pressable>
      </View>

      <Text style={[styles.label, { marginTop: 28 }]}>What is it for?</Text>
      <TextInput
        style={styles.textInput}
        value={purpose}
        onChangeText={setPurpose}
        placeholder="Inventory"
        placeholderTextColor="#9ca3af"
      />

      <Text style={[styles.label, { marginTop: 20 }]}>Repayment duration</Text>
      <View style={styles.quickRow}>
        {DURATIONS.map((d) => (
          <Pressable
            key={d}
            style={[styles.durationChip, duration === d && styles.durationChipActive]}
            onPress={() => setDuration(d)}
          >
            <Text
              style={[
                styles.durationChipText,
                duration === d && styles.durationChipTextActive,
              ]}
            >
              {d} mon
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      <Pressable
        style={[
          styles.continueButton,
          (amount <= 0 || !purpose.trim()) && styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
        disabled={amount <= 0 || !purpose.trim()}
      >
        <Text style={styles.continueText}>See loan terms</Text>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  eligibleText: {
    textAlign: "center",
    fontSize: 13,
    color: "#6b7280",
  },
  label: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 10,
  },
  amountInput: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },
  quickRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  quickChip: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  quickChipActive: {
    backgroundColor: "#16294D",
    borderColor: "#16294D",
  },
  quickChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  quickChipTextActive: {
    color: "#fff",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  durationChip: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  durationChipActive: {
    backgroundColor: "#16294D",
    borderColor: "#16294D",
  },
  durationChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  durationChipTextActive: {
    color: "#fff",
  },
  continueButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#A7D9C4",
  },
  continueText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});