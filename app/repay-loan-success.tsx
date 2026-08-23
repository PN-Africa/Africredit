import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Check } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";
import { formatCurrency } from "../lib/loanMath";

export default function RepayLoanSuccess() {
  const { lastPayment, outstandingBalance } = useLoan();

  if (!lastPayment) {
    router.replace("/(tabs)/home");
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Check size={32} color="#22A67A" strokeWidth={3} />
        </View>
        <Text style={styles.title}>Payment successful</Text>
        <Text style={styles.subtitle}>
          Your repayment has been received and your loan balance is updated
        </Text>

        <View style={styles.detailsCard}>
          <Text style={styles.amountText}>
            {formatCurrency(lastPayment.amount)}
          </Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Paid from</Text>
            <Text style={styles.detailValue}>{lastPayment.method}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{lastPayment.date}</Text>
          </View>
          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Reference</Text>
            <Text style={styles.detailValue}>{lastPayment.reference}</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Due 15 Aug 2026</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabelText}>New outstanding balance</Text>
            <Text style={styles.balanceValue}>
              {formatCurrency(outstandingBalance)}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        style={styles.doneButton}
        onPress={() => router.replace("/(tabs)/home")}
      >
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
    paddingTop: 20,
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
    paddingHorizontal: 12,
    lineHeight: 19,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    paddingHorizontal: 16,
    paddingTop: 16,
    width: "100%",
    marginTop: 24,
    alignItems: "center",
  },
  amountText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EAE0",
    width: "100%",
  },
  detailLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  balanceCard: {
    backgroundColor: "#16294D",
    borderRadius: 12,
    padding: 14,
    width: "100%",
    marginTop: 16,
  },
  balanceLabel: {
    fontSize: 11,
    color: "#9CA8BE",
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabelText: {
    fontSize: 13,
    color: "#fff",
  },
  balanceValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#22A67A",
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