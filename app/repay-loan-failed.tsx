import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";
import { formatCurrency } from "../lib/loanMath";

export default function RepayLoanFailed() {
  const { lastPayment } = useLoan();

  if (!lastPayment) {
    router.replace("/(tabs)/home");
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <X size={32} color="#E7514F" strokeWidth={3} />
        </View>
        <Text style={styles.title}>Payment failed</Text>
        <Text style={styles.subtitle}>
          We couldn't complete this repayment
        </Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>
              {formatCurrency(lastPayment.amount)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment method</Text>
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

        <Text style={styles.reasonText}>
          Reason: Insufficient funds in the selected account
        </Text>
      </View>

      <Pressable
        style={styles.tryAgainButton}
        onPress={() => router.replace("/repay-loan")}
      >
        <Text style={styles.tryAgainText}>Try again</Text>
      </Pressable>
      <Pressable
        style={styles.backButton}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Text style={styles.backText}>Back to home</Text>
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
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FDECEC",
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
    marginTop: 6,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    paddingHorizontal: 16,
    width: "100%",
    marginTop: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EAE0",
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
  reasonText: {
    fontSize: 12,
    color: "#E7514F",
    marginTop: 12,
    alignSelf: "flex-start",
  },
  tryAgainButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  tryAgainText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  backButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  backText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },
});