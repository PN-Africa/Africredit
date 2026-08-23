import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Check } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";

const approvedDetails = [
  { label: "Amount", value: "N250,000" },
  { label: "Purpose", value: "Inventory & stock" },
  { label: "Duration", value: "1 month" },
];

export default function LoanApproved() {
  const { setStatus } = useLoan();

  const handleDone = () => {
    setStatus("activeLoan");
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Approved</Text>

      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Check size={32} color="#22A67A" strokeWidth={3} />
        </View>
        <Text style={styles.title}>Your loan has been approved</Text>
        <Text style={styles.subtitle}>
          N250,000 has been sent to your GTBank*******1234 account. It should
          reflect within 1 hour
        </Text>

        <View style={styles.detailsCard}>
          {approvedDetails.map((item, i) => (
            <View
              key={item.label}
              style={[
                styles.detailRow,
                i === approvedDetails.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable style={styles.doneButton} onPress={handleDone}>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 19,
    paddingHorizontal: 12,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    paddingHorizontal: 16,
    width: "100%",
    marginTop: 28,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
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