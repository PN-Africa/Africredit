import { View, Text, Pressable, StyleSheet, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import {
  Bell,
  Landmark,
  FileText,
  CheckCircle2,
  ArrowDownToLine,
  Check,
} from "lucide-react-native";
import { useLoan } from "../../contexts/LoanContext";
import { useProfile } from "../../contexts/ProfileContext";
import { formatCurrency } from "../../lib/loanMath";

const recentActivity = [
  { icon: "bank", title: "Bank account connected", time: "Today, 10:15 AM" },
  { icon: "bill", title: "Utility bill uploaded", time: "Today, 10:15 AM" },
  { icon: "bank", title: "Bank account connected", time: "Today, 10:15 AM" },
  { icon: "bill", title: "Utility bill uploaded", time: "Today, 10:15 AM" },
];

const activeLoanActivity = [
  {
    icon: "check",
    title: "Repayment received",
    time: "Today, 10:15 AM",
    amount: "N35,000",
  },
  {
    icon: "disburse",
    title: "Loan disbursed to BVN*****1234",
    time: "Today, 10:15 AM",
    amount: "N35,000",
  },
  { icon: "bank", title: "Bank account connected", time: "Today, 10:15 AM" },
  { icon: "bill", title: "Utility bill uploaded", time: "Today, 10:15 AM" },
];

function ActivityIcon({ type }: { type: string }) {
  const size = 16;
  const color = "#22A67A";
  switch (type) {
    case "check":
      return <CheckCircle2 size={size} color={color} />;
    case "disburse":
      return <ArrowDownToLine size={size} color={color} />;
    case "bill":
      return <FileText size={size} color={color} />;
    default:
      return <Landmark size={size} color={color} />;
  }
}

function getEligibilityStage(bankConnected: boolean, billUploaded: boolean) {
  const completed = [bankConnected, billUploaded].filter(Boolean).length;
  if (completed === 0) return { index: 0, percent: 20 };
  if (completed === 1) return { index: 1, percent: 60 };
  return { index: 2, percent: 100 };
}

export default function Home() {
  const {
    status,
    boost,
    loanTotal,
    outstandingBalance,
    startNewLoan,
    activeLoanDetails,
    application,
  } = useLoan();
  const { fullName } = useProfile();

  const firstName = fullName.trim().split(" ")[0] || "there";

  const repaidPercent =
    loanTotal > 0
      ? Math.round(((loanTotal - outstandingBalance) / loanTotal) * 100)
      : 0;

  const eligibility = getEligibilityStage(
    boost.bankConnected,
    boost.billUploaded
  );
  const stageLabels = ["Building", "Good standing", "Excellent"];

  const nextPaymentAmount = activeLoanDetails
    ? Math.min(
        Math.round(
          activeLoanDetails.totalRepayment / activeLoanDetails.durationMonths
        ),
        outstandingBalance
      )
    : 35000;

  const handleBell = () => {
    Alert.alert("Notifications", "You're all caught up!");
  };

  const handleApplyForNewLoan = () => {
    startNewLoan();
    router.push("/apply-loan-amount");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good afternoon</Text>
          <Text style={styles.name}>{firstName} 👋</Text>
        </View>
        <Pressable style={styles.bellButton} onPress={handleBell}>
          <Bell size={18} color="#111827" />
        </Pressable>
      </View>

      {/* Status card */}
      {status === "eligible" && (
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Your Eligibility</Text>
          <Text style={styles.statusAmount}>Up to N350,000</Text>
          <Text style={styles.statusSubtext}>
            Based on your connected bank activities
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${eligibility.percent}%` }]}
            />
          </View>
          <View style={styles.progressLabels}>
            {stageLabels.map((label, i) => (
              <Text
                key={label}
                style={
                  i === eligibility.index
                    ? styles.progressLabelActive
                    : styles.progressLabel
                }
              >
                {label}
              </Text>
            ))}
          </View>
        </View>
      )}

      {status === "activeLoan" && (
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Outstanding Balance</Text>
          <Text style={styles.statusAmount}>
            {formatCurrency(outstandingBalance)}
          </Text>
          <Text style={styles.statusSubtext}>
            of {formatCurrency(loanTotal)} borrowed – {repaidPercent}% repaid
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFillGreen, { width: `${repaidPercent}%` }]}
            />
          </View>
          <View style={styles.paymentRow}>
            <View>
              <Text style={styles.paymentLabel}>Next payment</Text>
              <Text style={styles.paymentValue}>
                {outstandingBalance > 0
                  ? formatCurrency(nextPaymentAmount)
                  : "Fully repaid"}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.paymentLabel}>Due date</Text>
              <Text style={styles.paymentValue}>15 Aug 2026</Text>
            </View>
          </View>
          {outstandingBalance > 0 ? (
            <Pressable
              style={styles.repayButton}
              onPress={() => router.push("/repay-loan")}
            >
              <Text style={styles.repayButtonText}>Repay now</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.repayButton}
              onPress={handleApplyForNewLoan}
            >
              <Text style={styles.repayButtonText}>Apply for a new loan</Text>
            </Pressable>
          )}
        </View>
      )}

      {status === "underReview" && application && (
        <View style={styles.statusCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.statusLabel}>Loan Requested</Text>
            <View style={styles.reviewBadge}>
              <Text style={styles.reviewBadgeText}>Under Review</Text>
            </View>
          </View>
          <Text style={styles.statusAmount}>
            {formatCurrency(application.amount)}
          </Text>
          <Text style={styles.statusSubtext}>
            {application.purpose} · {application.durationMonths} month
            {application.durationMonths > 1 ? "s" : ""} · submitted today,
            11:30 AM
          </Text>
          <Pressable
            style={styles.reviewButton}
            onPress={() => router.push("/apply-loan-review")}
          >
            <Text style={styles.reviewButtonText}>Review application</Text>
          </Pressable>
        </View>
      )}

      {/* Boost eligibility card - only shown when eligible */}
      {status === "eligible" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Boost your eligibility</Text>

          <View style={styles.boostRow}>
            <View style={styles.boostIcon}>
              {boost.bankConnected ? (
                <Check size={16} color="#22A67A" />
              ) : (
                <Landmark size={16} color="#D97706" />
              )}
            </View>
            <View style={styles.boostText}>
              <Text style={styles.boostTitle}>
                {boost.bankConnected
                  ? "Bank account connected"
                  : "Connect bank account"}
              </Text>
              <Text style={styles.boostSubtitle}>
                {boost.bankConnected ? boost.bankName : "Strengthens your score"}
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/connect-bank")}
              disabled={boost.bankConnected}
            >
              <Text
                style={[
                  styles.boostAction,
                  boost.bankConnected && { color: "#9ca3af" },
                ]}
              >
                {boost.bankConnected ? "Connected" : "Connect"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.boostRow}>
            <View style={styles.boostIcon}>
              {boost.billUploaded ? (
                <Check size={16} color="#22A67A" />
              ) : (
                <FileText size={16} color="#D97706" />
              )}
            </View>
            <View style={styles.boostText}>
              <Text style={styles.boostTitle}>
                {boost.billUploaded
                  ? "Utility bill uploaded"
                  : "Upload a utility bill"}
              </Text>
              <Text style={styles.boostSubtitle} numberOfLines={1}>
                {boost.billUploaded
                  ? boost.billFileName
                  : "Strengthens your score"}
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/upload-bill")}
              disabled={boost.billUploaded}
            >
              <Text
                style={[
                  styles.boostAction,
                  boost.billUploaded && { color: "#9ca3af" },
                ]}
              >
                {boost.billUploaded ? "Uploaded" : "Upload"}
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Apply for a loan - eligible state */}
      {status === "eligible" && (
        <Pressable
          style={styles.applyButton}
          onPress={() => router.push("/apply-loan-amount")}
        >
          <Text style={styles.applyButtonText}>Apply for a loan</Text>
        </Pressable>
      )}

      {/* What happens next - under review state */}
      {status === "underReview" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What happens next</Text>
          <Text style={styles.whatHappensText}>
            Our finance team is reviewing your application. We'll notify you
            the moment a decision is made. Decisions are made within 24hrs.
          </Text>
        </View>
      )}

      {/* Recent activity */}
      <View style={styles.card}>
        <View style={styles.activityHeader}>
          <Text style={styles.cardTitle}>Recent activity</Text>
          <Pressable onPress={() => router.push("/(tabs)/activity")}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        {(status === "activeLoan" ? activeLoanActivity : recentActivity).map(
          (item, i) => (
            <View key={i} style={styles.activityRow}>
              <View style={styles.activityIconWrap}>
                <ActivityIcon type={item.icon} />
              </View>
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
              {"amount" in item && (
                <Text style={styles.activityAmount}>{item.amount}</Text>
              )}
            </View>
          )
        )}
      </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 13,
    color: "#9ca3af",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 2,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  statusCard: {
    backgroundColor: "#16294D",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  statusLabel: {
    color: "#22A67A",
    fontSize: 13,
    fontWeight: "700",
  },
  statusAmount: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 6,
  },
  statusSubtext: {
    color: "#9CA8BE",
    fontSize: 13,
    marginTop: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 3,
    marginTop: 16,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: "#22A67A",
    borderRadius: 3,
  },
  progressFillGreen: {
    height: 6,
    backgroundColor: "#22A67A",
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  progressLabel: {
    color: "#9CA8BE",
    fontSize: 11,
  },
  progressLabelActive: {
    color: "#22A67A",
    fontSize: 11,
    fontWeight: "700",
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  paymentLabel: {
    color: "#9CA8BE",
    fontSize: 12,
  },
  paymentValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  repayButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  repayButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewBadge: {
    backgroundColor: "rgba(217,119,6,0.2)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  reviewBadgeText: {
    color: "#F59E0B",
    fontSize: 11,
    fontWeight: "700",
  },
  reviewButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  boostRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  boostIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FEF3E2",
    alignItems: "center",
    justifyContent: "center",
  },
  boostText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  boostTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  boostSubtitle: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  boostAction: {
    color: "#22A67A",
    fontSize: 13,
    fontWeight: "700",
  },
  applyButton: {
    backgroundColor: "#16294D",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  whatHappensText: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 8,
    lineHeight: 19,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    color: "#22A67A",
    fontSize: 13,
    fontWeight: "600",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  activityIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#E3F5EC",
    alignItems: "center",
    justifyContent: "center",
  },
  activityText: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  activityTime: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  activityAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
});