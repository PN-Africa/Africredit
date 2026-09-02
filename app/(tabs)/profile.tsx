import { View, Text, Pressable, StyleSheet, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import {
  User,
  Landmark,
  Lock,
  Headphones,
  FileText,
  ChevronRight,
} from "lucide-react-native";
import { useProfile } from "../../contexts/ProfileContext";
import { useLoan } from "../../contexts/LoanContext";
import { PAST_LOANS } from "../../lib/loanHistory";

export default function Profile() {
  const { fullName, phone, bankAccounts, photoUri } = useProfile();
  const { terminatedLoans, activeLoanDetails } = useLoan();

  const completedCount = PAST_LOANS.filter(
    (l) => l.status === "completed"
  ).length;
  const loansTaken =
    completedCount + terminatedLoans.length + (activeLoanDetails ? 1 : 0);

  const primaryAccount = bankAccounts.find((a) => a.isPrimary);
  const initial = fullName.trim().charAt(0).toUpperCase() || "?";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.headerCard}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
        )}
        <View >
            <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.phone}>{phone}</Text>
        <View style={styles.statusPill}>
          <Text style={styles.statusPillText}>Good standing</Text>
        </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCell}>
          <Text style={styles.statValue}>{loansTaken}</Text>
          <Text style={styles.statLabel}>Loans taken</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCell}>
          <Text style={styles.statValue}>N350,000</Text>
          <Text style={styles.statLabel}>Eligibility</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCell}>
          <Text style={styles.statValue}>98%</Text>
          <Text style={styles.statLabel}>On-time rate</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Account</Text>
      <View style={styles.card}>
        <Pressable
          style={styles.row}
          onPress={() => router.push("/personal-information")}
        >
          <View style={styles.rowIcon}>
            <User size={16} color="#22A67A" />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Personal Information</Text>
            <Text style={styles.rowSubtitle}>Name, phone</Text>
          </View>
          <ChevronRight size={18} color="#9ca3af" />
        </Pressable>

        <Pressable
          style={[styles.row, { borderBottomWidth: 0 }]}
          onPress={() => router.push("/bank-accounts")}
        >
          <View style={styles.rowIcon}>
            <Landmark size={16} color="#22A67A" />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Linked bank account</Text>
            <Text style={styles.rowSubtitle} numberOfLines={1}>
              {primaryAccount
                ? `${primaryAccount.bankName}**********${primaryAccount.last4}`
                : "No account linked"}
            </Text>
          </View>
          <ChevronRight size={18} color="#9ca3af" />
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>Security</Text>
      <View style={styles.card}>
        <Pressable
  style={[styles.row, { borderBottomWidth: 0 }]}
  onPress={() => router.push("/change-password")}
>
          <View style={styles.rowIcon}>
            <Lock size={16} color="#22A67A" />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Change Password</Text>
            <Text style={styles.rowSubtitle}>Update your login password</Text>
          </View>
          <ChevronRight size={18} color="#9ca3af" />
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>Support</Text>
      <View style={styles.card}>
        <Pressable
          style={styles.row}
          onPress={() => router.push("/help-support")}
        >
          <View style={styles.rowIcon}>
            <Headphones size={16} color="#22A67A" />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Help & support</Text>
            <Text style={styles.rowSubtitle}>Chat with us anytime</Text>
          </View>
          <ChevronRight size={18} color="#9ca3af" />
        </Pressable>

        <Pressable
          style={[styles.row, { borderBottomWidth: 0 }]}
          onPress={() => router.push("/terms-privacy")}
        >
          <View style={styles.rowIcon}>
            <FileText size={16} color="#22A67A" />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Terms & privacy policy</Text>
          </View>
          <ChevronRight size={18} color="#9ca3af" />
        </Pressable>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  headerCard: {
    backgroundColor: "#16294D",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#22A67A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  phone: {
    color: "#9CA8BE",
    fontSize: 13,
    marginTop: 2,
  },
  statusPill: {
    backgroundColor: "rgba(34,166,122,0.2)",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 10,
  },
  statusPillText: {
    color: "#22A67A",
    fontSize: 12,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginTop: 12,
    paddingVertical: 16,
  },
  statCell: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#F0EAE0",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  statLabel: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 4,
    textAlign: "center",
  },
  sectionLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
    marginTop: 22,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EAE0",
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#E3F5EC",
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flex: 1,
    marginLeft: 12,
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  rowSubtitle: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
});