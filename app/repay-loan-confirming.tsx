import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useLoan } from "../contexts/LoanContext";
import { formatCurrency, formatDate } from "../lib/loanMath";

export default function RepayLoanConfirming() {
  const { pendingRepayAmount, boost, recordPayment } = useLoan();

  const bankLabel = boost.bankConnected
    ? `${boost.bankName} *****1234`
    : "GTBank *****1234";

  useEffect(() => {
    const timer = setTimeout(() => {
      const success = Math.random() < 0.85;
      const reference = `RPY-${Math.floor(10000 + Math.random() * 89999)}`;

      recordPayment({
        amount: pendingRepayAmount,
        method: bankLabel,
        date: formatDate(new Date()),
        reference,
        success,
      });

      router.replace(success ? "/repay-loan-success" : "/repay-loan-failed");
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#22A67A" />
      <Text style={styles.title}>Confirming Payment</Text>

      <View style={styles.debitCard}>
        <Text style={styles.debitLabel}>Debiting from {bankLabel}</Text>
        <Text style={styles.debitAmount}>
          {formatCurrency(pendingRepayAmount)}
        </Text>
      </View>
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
    marginBottom: 24,
  },
  debitCard: {
    backgroundColor: "#16294D",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
  },
  debitLabel: {
    fontSize: 12,
    color: "#9CA8BE",
  },
  debitAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginTop: 6,
  },
});