import { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Clock, Check, X, ChevronRight, Trash2 } from "lucide-react-native";
import { useLoan } from "../../contexts/LoanContext";
import { formatCurrency, formatDate } from "../../lib/loanMath";
import { PAST_LOANS, getYear, LoanRecord } from "../../lib/loanHistory";

type FilterKey = "all" | "active" | "completed" | "terminated";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "terminated", label: "Terminated" },
];

function StatusBadge({ status }: { status: LoanRecord["status"] }) {
  if (status === "active") {
    return (
      <View style={[styles.badge, styles.badgeActive]}>
        <Text style={[styles.badgeText, styles.badgeTextActive]}>Active</Text>
      </View>
    );
  }
  if (status === "terminated") {
    return (
      <View style={[styles.badge, styles.badgeTerminated]}>
        <Text style={[styles.badgeText, styles.badgeTextTerminated]}>
          Terminated
        </Text>
      </View>
    );
  }
  return (
    <View style={[styles.badge, styles.badgeCompleted]}>
      <Text style={[styles.badgeText, styles.badgeTextCompleted]}>
        Completed
      </Text>
    </View>
  );
}

function StatusIcon({ status }: { status: LoanRecord["status"] }) {
  if (status === "active") {
    return (
      <View style={[styles.rowIcon, { backgroundColor: "#FEF3E2" }]}>
        <Clock size={16} color="#D97706" />
      </View>
    );
  }
  if (status === "terminated") {
    return (
      <View style={[styles.rowIcon, { backgroundColor: "#FDECEC" }]}>
        <X size={16} color="#E7514F" />
      </View>
    );
  }
  return (
    <View style={[styles.rowIcon, { backgroundColor: "#E3F5EC" }]}>
      <Check size={16} color="#22A67A" />
    </View>
  );
}

export default function Loans() {
  const {
    status: liveStatus,
    activeLoanDetails,
    repaymentHistory,
    outstandingBalance,
    startNewLoan,
    terminatedLoans,
  } = useLoan();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const allLoans: LoanRecord[] = [];

  if (liveStatus === "activeLoan" && activeLoanDetails) {
    const isPaidOff = outstandingBalance === 0;
    allLoans.push({
      id: "current",
      amount: activeLoanDetails.amount,
      purpose: activeLoanDetails.purpose,
      durationMonths: activeLoanDetails.durationMonths,
      interestRate: activeLoanDetails.interestRate,
      disbursedDate: activeLoanDetails.disbursedDate,
      disbursedTo: activeLoanDetails.disbursedTo,
      totalRepayment: activeLoanDetails.totalRepayment,
      status: isPaidOff ? "completed" : "active",
      closedDate: isPaidOff ? formatDate(new Date()) : undefined,
      repaymentHistory: repaymentHistory.map((p) => ({
        date: p.date,
        amount: p.amount,
      })),
    });
  }

  // Real terminations from this session, newest first, given unique IDs
  // so they can be filtered/deleted independently of the mock history.
  terminatedLoans.forEach((t, i) => {
    allLoans.push({
      id: `terminated-${i}`,
      amount: t.amount,
      purpose: t.purpose,
      durationMonths: 1,
      interestRate: "3.5% / month",
      disbursedDate: t.date,
      disbursedTo: "GTBank *****1234",
      totalRepayment: t.amount,
      status: "terminated",
      closedDate: t.date,
      repaymentHistory: [],
    });
  });

  allLoans.push(...PAST_LOANS);

  const visibleLoans = allLoans.filter((l) => !deletedIds.includes(l.id));

  const filtered =
    filter === "all"
      ? visibleLoans
      : visibleLoans.filter((l) => l.status === filter);

  const grouped = filtered.reduce<Record<string, LoanRecord[]>>((acc, loan) => {
    const year = getYear(loan.disbursedDate);
    const label = year === "2026" ? "This Year" : "Last Year";
    if (!acc[label]) acc[label] = [];
    acc[label].push(loan);
    return acc;
  }, {});

  const sectionOrder = ["This Year", "Last Year"].filter((s) => grouped[s]);

  const handleDelete = (loan: LoanRecord) => {
    setDeletedIds((prev) => [...prev, loan.id]);
    if (loan.id === "current") {
      startNewLoan();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Loans</Text>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <Pressable
            key={f.key}
            style={[
              styles.filterChip,
              filter === f.key && styles.filterChipActive,
            ]}
            onPress={() => setFilter(f.key)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f.key && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {sectionOrder.length === 0 && (
        <Text style={styles.emptyText}>No loans in this category yet.</Text>
      )}

      {sectionOrder.map((section) => (
        <View key={section} style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>{section}</Text>
          {grouped[section].map((loan) => {
            const canDelete = loan.status !== "active";

            const rowContent = (
              <Pressable
                style={styles.loanRow}
                onPress={() => router.push(`/loan-details?id=${loan.id}`)}
              >
                <StatusIcon status={loan.status} />
                <View style={styles.loanRowText}>
                  <View style={styles.loanRowTop}>
                    <Text style={styles.loanAmount}>
                      {formatCurrency(loan.amount)}
                    </Text>
                    <StatusBadge status={loan.status} />
                  </View>
                  <Text style={styles.loanSubtitle}>
                    {loan.purpose} –{" "}
                    {loan.status === "active"
                      ? `Disbursed ${loan.disbursedDate}`
                      : `Closed ${loan.closedDate}`}
                  </Text>
                </View>
                <ChevronRight size={18} color="#9ca3af" />
              </Pressable>
            );

            if (!canDelete) {
              return (
                <View key={loan.id} style={styles.rowWrapper}>
                  {rowContent}
                </View>
              );
            }

            return (
              <View key={loan.id} style={styles.rowWrapper}>
                <Swipeable
                  overshootRight={false}
                  renderRightActions={() => (
                    <Pressable
                      style={styles.deleteAction}
                      onPress={() => handleDelete(loan)}
                    >
                      <Trash2 size={20} color="#fff" />
                    </Pressable>
                  )}
                >
                  {rowContent}
                </Swipeable>
              </View>
            );
          })}
        </View>
      ))}
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  filterChipActive: {
    backgroundColor: "#16294D",
    borderColor: "#16294D",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  filterTextActive: {
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 13,
    color: "#9ca3af",
    fontWeight: "600",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 24,
    textAlign: "center",
  },
  rowWrapper: {
    marginBottom: 10,
  },
  loanRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  loanRowText: {
    flex: 1,
  },
  loanRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loanAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  loanSubtitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  badgeActive: {
    backgroundColor: "#FEF3E2",
  },
  badgeTextActive: {
    color: "#D97706",
  },
  badgeCompleted: {
    backgroundColor: "#E3F5EC",
  },
  badgeTextCompleted: {
    color: "#22A67A",
  },
  badgeTerminated: {
    backgroundColor: "#FDECEC",
  },
  badgeTextTerminated: {
    color: "#E7514F",
  },
  deleteAction: {
    backgroundColor: "#E7514F",
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    borderRadius: 12,
    marginLeft: 8,
  },
});