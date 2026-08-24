import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";
import { formatCurrency } from "../lib/loanMath";

export default function TerminateSuccess() {
  const { lastTermination } = useLoan();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <X size={32} color="#E7514F" strokeWidth={3} />
        </View>
        <Text style={styles.title}>Application terminated</Text>
        <Text style={styles.subtitle}>
          Your loan application has been cancelled. No funds were disbursed
          and no fees were charged
        </Text>

        {lastTermination && (
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>
                {formatCurrency(lastTermination.amount)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Purpose</Text>
              <Text style={styles.detailValue}>{lastTermination.purpose}</Text>
            </View>
            <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.detailLabel}>Terminated on</Text>
              <Text style={styles.detailValue}>{lastTermination.date}</Text>
            </View>
          </View>
        )}
      </View>

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
    justifyContent: "center",
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
  backButton: {
    backgroundColor: "#16294D",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});