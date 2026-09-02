import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";
import {
  calcLoanTerms,
  buildRepaymentSchedule,
  formatCurrency,
} from "../lib/loanMath";

export default function ApplyLoanTerms() {
  const { application } = useLoan();

  useEffect(() => {
    if (!application) {
      router.replace("/apply-loan-amount");
    }
  }, [application]);

  if (!application) {
    return null;
  }

  const { totalInterest, totalRepayable, monthlyRepayment } = calcLoanTerms(
    application.amount,
    application.durationMonths
  );
  const schedule = buildRepaymentSchedule(
    application.amount,
    application.durationMonths
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <View style={styles.termsCard}>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Amount requested</Text>
          <Text style={styles.termValue}>
            {formatCurrency(application.amount)}
          </Text>
        </View>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Interest rate</Text>
          <Text style={styles.termValue}>3.5% / month (flat)</Text>
        </View>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Total interest</Text>
          <Text style={styles.termValue}>{formatCurrency(totalInterest)}</Text>
        </View>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Total repayable</Text>
          <Text style={styles.termValue}>
            {formatCurrency(totalRepayable)}
          </Text>
        </View>
        <View style={[styles.termRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.termLabel}>Monthly repayment</Text>
          <Text style={styles.termValue}>
            {formatCurrency(monthlyRepayment)} / month
          </Text>
        </View>
      </View>

      <View style={styles.scheduleCard}>
        <Text style={styles.scheduleTitle}>Repayment schedule</Text>
        {schedule.map((row) => (
          <View key={row.month} style={styles.scheduleRow}>
            <Text style={styles.scheduleMonth}>
              Month {row.month}{"\n"}
              <Text style={styles.scheduleDate}>{row.dueDate}</Text>
            </Text>
            <Text style={styles.scheduleAmount}>
              {formatCurrency(row.amount)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.disclaimer}>
        Interest is calculated on a flat monthly rate against your original
        amount. No hidden fees or early repayment penalties.
      </Text>

      <View style={{ flex: 1 }} />

      <Pressable
        style={styles.continueButton}
        onPress={() => router.push("/apply-loan-review")}
      >
        <Text style={styles.continueText}>Continue to review</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
    flexGrow: 1,
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
  termsCard: {
    backgroundColor: "#16294D",
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  termRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  termLabel: {
    fontSize: 13,
    color: "#9CA8BE",
  },
  termValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  scheduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    padding: 16,
    marginTop: 16,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  scheduleMonth: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "600",
  },
  scheduleDate: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "400",
  },
  scheduleAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  disclaimer: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 12,
    lineHeight: 16,
  },
  continueButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  continueText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});