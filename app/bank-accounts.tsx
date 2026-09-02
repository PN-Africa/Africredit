import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { router } from "expo-router";
import { ArrowLeft, Plus, Trash2 } from "lucide-react-native";
import { useProfile } from "../contexts/ProfileContext";

export default function BankAccounts() {
  const { bankAccounts, setPrimaryBankAccount, removeBankAccount } =
    useProfile();

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.title}>Bank accounts</Text>
      <Text style={styles.sectionLabel}>Connected accounts</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {bankAccounts.map((acc) => (
          <View key={acc.id} style={styles.rowWrapper}>
            <Swipeable
              overshootRight={false}
              renderRightActions={() => (
                <Pressable
                  style={styles.deleteAction}
                  onPress={() => removeBankAccount(acc.id)}
                >
                  <Trash2 size={20} color="#fff" />
                </Pressable>
              )}
            >
              <View style={styles.bankCard}>
                <View style={styles.bankCardTop}>
                  <Text style={styles.bankName}>{acc.bankName}</Text>
                  {acc.isPrimary ? (
                    <View style={styles.primaryBadge}>
                      <Text style={styles.primaryBadgeText}>Primary</Text>
                    </View>
                  ) : (
                    <Pressable
                      style={styles.setPrimaryBadge}
                      onPress={() => setPrimaryBankAccount(acc.id)}
                    >
                      <Text style={styles.setPrimaryBadgeText}>
                        Set as primary
                      </Text>
                    </Pressable>
                  )}
                </View>
                <Text style={styles.bankNumber}>**** **** {acc.last4}</Text>

                <View style={styles.bankCardBottom}>
                  <View>
                    <Text style={styles.bankSubLabel}>Account name</Text>
                    <Text style={styles.bankSubValue}>{acc.accountName}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.bankSubLabel}>Connected</Text>
                    <Text style={styles.bankSubValue}>
                      {acc.connectedDate}
                    </Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          </View>
        ))}

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/add-bank-account")}
        >
          <Plus size={16} color="#22A67A" />
          <Text style={styles.addButtonText}>Add another bank account</Text>
        </Pressable>

        <Text style={styles.hintText}>Slide bank to remove</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
    paddingHorizontal: 20,
    paddingTop: 60,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  sectionLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 10,
  },
  rowWrapper: {
    marginBottom: 12,
  },
  bankCard: {
    backgroundColor: "#16294D",
    borderRadius: 14,
    padding: 16,
  },
  bankCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bankName: {
    color: "#9CA8BE",
    fontSize: 13,
  },
  primaryBadge: {
    backgroundColor: "rgba(34,166,122,0.25)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  primaryBadgeText: {
    color: "#22A67A",
    fontSize: 10,
    fontWeight: "700",
  },
  setPrimaryBadge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  setPrimaryBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  bankNumber: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
    letterSpacing: 1,
  },
  bankCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  bankSubLabel: {
    color: "#9CA8BE",
    fontSize: 11,
  },
  bankSubValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    marginTop: 4,
  },
  addButtonText: {
    color: "#22A67A",
    fontSize: 13,
    fontWeight: "700",
  },
  hintText: {
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 12,
  },
  deleteAction: {
    backgroundColor: "#E7514F",
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    borderRadius: 14,
    marginLeft: 8,
  },
});