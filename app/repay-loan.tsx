import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";
import { formatCurrency } from "../lib/loanMath";

const MIN_PAYMENT = 35000;

export default function RepayLoan() {
  const { outstandingBalance, boost, setPendingRepayAmount } = useLoan();
  const [amount, setAmount] = useState(
    Math.min(MIN_PAYMENT, outstandingBalance)
  );

  const bankLabel = boost.bankConnected
    ? `${boost.bankName} *****1234`
    : "GTBank *****1234";

  const handleRepay = () => {
    setPendingRepayAmount(amount);
    router.push("/repay-loan-confirming");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.title}>Repay loan</Text>

      <View style={styles.balanceCard}>
        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.balanceLabel}>Outstanding balance</Text>
            <Text style={styles.balanceValue}>
              {formatCurrency(outstandingBalance)}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.balanceLabel}>Due 15 Aug 2026</Text>
            <Text style={styles.balanceValueGreen}>
              {formatCurrency(MIN_PAYMENT)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.amountCard}>
        <Text style={styles.amountLabel}>Enter amount to repay</Text>
        <Text style={styles.amountValue}>{formatCurrency(amount)}</Text>

        <View style={styles.quickRow}>
          <Pressable
            style={[
              styles.quickChip,
              amount === MIN_PAYMENT && styles.quickChipActive,
            ]}
            onPress={() => setAmount(Math.min(MIN_PAYMENT, outstandingBalance))}
          >
            <Text
              style={[
                styles.quickChipText,
                amount === MIN_PAYMENT && styles.quickChipTextActive,
              ]}
            >
              Next payment
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.quickChip,
              amount === Math.round(outstandingBalance / 2) &&
                styles.quickChipActive,
            ]}
            onPress={() => setAmount(Math.round(outstandingBalance / 2))}
          >
            <Text
              style={[
                styles.quickChipText,
                amount === Math.round(outstandingBalance / 2) &&
                  styles.quickChipTextActive,
              ]}
            >
              Pay half
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.quickChip,
              amount === outstandingBalance && styles.quickChipActive,
            ]}
            onPress={() => setAmount(outstandingBalance)}
          >
            <Text
              style={[
                styles.quickChipText,
                amount === outstandingBalance && styles.quickChipTextActive,
              ]}
            >
              Pay in full
            </Text>
          </Pressable>
        </View>

        <Text style={styles.debitText}>
          Amount will be debited from {bankLabel}
        </Text>
      </View>

      <View style={styles.breakdownCard}>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Repayment amount</Text>
          <Text style={styles.breakdownValue}>{formatCurrency(amount)}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Processing fee</Text>
          <Text style={styles.breakdownValue}>No</Text>
        </View>
        <View style={[styles.breakdownRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.breakdownLabelBold}>Total to pay</Text>
          <Text style={styles.breakdownValueGreen}>
            {formatCurrency(amount)}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <Pressable
        style={[
          styles.repayButton,
          amount <= 0 && styles.repayButtonDisabled,
        ]}
        onPress={handleRepay}
        disabled={amount <= 0}
      >
        <Text style={styles.repayText}>Repay {formatCurrency(amount)}</Text>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  balanceCard: {
    backgroundColor: "#16294D",
    borderRadius: 14,
    padding: 16,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceLabel: {
    fontSize: 11,
    color: "#9CA8BE",
  },
  balanceValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
  },
  balanceValueGreen: {
    fontSize: 18,
    fontWeight: "700",
    color: "#22A67A",
    marginTop: 4,
  },
  amountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    marginTop: 16,
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  amountValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 6,
    marginBottom: 16,
  },
  quickRow: {
    flexDirection: "row",
    gap: 8,
  },
  quickChip: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  debitText: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 16,
    textAlign: "center",
  },
  breakdownCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EAE0",
  },
  breakdownLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  breakdownLabelBold: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  breakdownValueGreen: {
    fontSize: 14,
    fontWeight: "700",
    color: "#22A67A",
  },
  repayButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  repayButtonDisabled: {
    backgroundColor: "#A7D9C4",
  },
  repayText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});