import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";
import { formatCurrency, formatDate } from "../lib/loanMath";
import { PAST_LOANS } from "../lib/loanHistory";

const STATUS_COLORS: Record<string, string> = {
  active: "#D97706",
  completed: "#22A67A",
  terminated: "#E7514F",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  terminated: "Terminated",
};

export default function LoanDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activeLoanDetails, outstandingBalance, repaymentHistory, terminatedLoans } =
    useLoan();

  const isCurrent = id === "current";
  const isPaidOff = isCurrent && outstandingBalance === 0;

  const isTerminatedFromSession = id?.startsWith("terminated-");
  const terminatedIndex = isTerminatedFromSession
    ? parseInt(id.replace("terminated-", ""), 10)
    : -1;
  const terminatedRecord =
    isTerminatedFromSession && terminatedLoans[terminatedIndex]
      ? terminatedLoans[terminatedIndex]
      : null;

  const loan =
    isCurrent && activeLoanDetails
      ? {
          id: "current",
          amount: activeLoanDetails.amount,
          purpose: activeLoanDetails.purpose,
          durationMonths: activeLoanDetails.durationMonths,
          interestRate: activeLoanDetails.interestRate,
          disbursedDate: activeLoanDetails.disbursedDate,
          disbursedTo: activeLoanDetails.disbursedTo,
          totalRepayment: activeLoanDetails.totalRepayment,
          status: (isPaidOff ? "completed" : "active") as
            | "completed"
            | "active",
          closedDate: isPaidOff ? formatDate(new Date()) : undefined,
          repaymentHistory: repaymentHistory.map((p) => ({
            date: p.date,
            amount: p.amount,
          })),
        }
      : terminatedRecord
      ? {
          id: id!,
          amount: terminatedRecord.amount,
          purpose: terminatedRecord.purpose,
          durationMonths: 1,
          interestRate: "3.5% / month",
          disbursedDate: terminatedRecord.date,
          disbursedTo: "GTBank *****1234",
          totalRepayment: terminatedRecord.amount,
          status: "terminated" as const,
          closedDate: terminatedRecord.date,
          repaymentHistory: [] as { date: string; amount: number }[],
        }
      : PAST_LOANS.find((l) => l.id === id);

  if (!loan) {
    return (
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#111827" />
        </Pressable>
        <Text style={styles.notFoundText}>Loan not found.</Text>
      </View>
    );
  }

  const info = [
    { label: "Purpose", value: loan.purpose },
    {
      label: "Duration",
      value: `${loan.durationMonths} month${loan.durationMonths > 1 ? "s" : ""}`,
    },
    { label: "Interest rate", value: loan.interestRate },
    { label: "Disbursed on", value: loan.disbursedDate },
    { label: "Disbursed to", value: loan.disbursedTo },
    { label: "Total repayment", value: formatCurrency(loan.totalRepayment) },
  ];

  const nextDue =
    isCurrent && outstandingBalance > 0
      ? formatCurrency(
          Math.min(
            Math.round(loan.totalRepayment / loan.durationMonths),
            outstandingBalance
          )
        )
      : "—";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.title}>Loan details</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Working capital</Text>
        <Text style={styles.summaryAmount}>{formatCurrency(loan.amount)}</Text>

        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summarySubLabel}>Outstanding</Text>
            <Text style={styles.summarySubValue}>
              {isCurrent
                ? formatCurrency(outstandingBalance)
                : formatCurrency(0)}
            </Text>
          </View>
          <View>
            <Text style={styles.summarySubLabel}>Status</Text>
            <Text
              style={[
                styles.summarySubValue,
                { color: STATUS_COLORS[loan.status] },
              ]}
            >
              {STATUS_LABELS[loan.status]}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.summarySubLabel}>Next due</Text>
            <Text style={styles.summarySubValue}>{nextDue}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Loan Information</Text>
      <View style={styles.detailsCard}>
        {info.map((item, i) => (
          <View
            key={item.label}
            style={[
              styles.detailRow,
              i === info.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Text style={styles.detailLabel}>{item.label}</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {loan.repaymentHistory.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Repayment History</Text>
          <View style={styles.detailsCard}>
            {loan.repaymentHistory.map((r, i) => (
              <View
                key={i}
                style={[
                  styles.repayRow,
                  i === loan.repaymentHistory.length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <View>
                  <Text style={styles.repayTitle}>Repayment received</Text>
                  <Text style={styles.repayDate}>{r.date}</Text>
                </View>
                <Text style={styles.repayAmount}>
                  {formatCurrency(r.amount)}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
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
    paddingBottom: 40,
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
  notFoundText: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: "#16294D",
    borderRadius: 16,
    padding: 20,
  },
  summaryLabel: {
    color: "#9CA8BE",
    fontSize: 13,
  },
  summaryAmount: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summarySubLabel: {
    color: "#9CA8BE",
    fontSize: 11,
  },
  summarySubValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginTop: 24,
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    paddingHorizontal: 16,
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
  repayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EAE0",
  },
  repayTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  repayDate: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  repayAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
});