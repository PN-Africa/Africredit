import { View, Text, Pressable, StyleSheet, Linking, Alert } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Phone, Mail, ChevronRight } from "lucide-react-native";
import { useProfile } from "../contexts/ProfileContext";

export default function HelpSupport() {
  const { fullName } = useProfile();
  const firstName = fullName.split(" ")[0];

  const handleStartChat = () => {
    Alert.alert("Live chat", "Connecting you to support...");
  };

  const handleCall = () => {
    Linking.openURL("tel:+2342342343456");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@africredit.app");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.title}>Help & Support</Text>

      <View style={styles.supportCard}>
        <Text style={styles.supportTitle}>Need a hand, {firstName}?</Text>
        <Text style={styles.supportSubtitle}>
          Our support team typically replies in under 5 minutes, every day
          from 8am to 10pm.
        </Text>
        <Pressable style={styles.chatButton} onPress={handleStartChat}>
          <Text style={styles.chatButtonText}>start a chat</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>Other ways to reach us</Text>

      <Pressable style={styles.contactRow} onPress={handleCall}>
        <View style={styles.contactIcon}>
          <Phone size={16} color="#111827" />
        </View>
        <View style={styles.contactText}>
          <Text style={styles.contactTitle}>Call support</Text>
          <Text style={styles.contactSubtitle}>+234 234 234 3456</Text>
        </View>
        <ChevronRight size={18} color="#9ca3af" />
      </Pressable>

      <Pressable
        style={[styles.contactRow, { marginTop: 10 }]}
        onPress={handleEmail}
      >
        <View style={styles.contactIcon}>
          <Mail size={16} color="#111827" />
        </View>
        <View style={styles.contactText}>
          <Text style={styles.contactTitle}>Email us</Text>
          <Text style={styles.contactSubtitle}>support@africredit.app</Text>
        </View>
        <ChevronRight size={18} color="#9ca3af" />
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
    marginBottom: 16,
  },
  supportCard: {
    backgroundColor: "#16294D",
    borderRadius: 16,
    padding: 20,
  },
  supportTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  supportSubtitle: {
    color: "#9CA8BE",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 19,
  },
  chatButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  sectionLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
  },
  contactIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  contactText: {
    flex: 1,
    marginLeft: 12,
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  contactSubtitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
});