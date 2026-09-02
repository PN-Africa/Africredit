import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

const SECTIONS = [
  {
    title: "1. Acceptance of terms",
    body: "By creating an account and applying for a loan, you agree to be bound by these terms and our lending policies, including repayment obligations and applicable interest rates.",
  },
  {
    title: "2. Eligibility & credit assessment",
    body: "Your loan eligibility is determined using information from your connected bank accounts, uploaded documents, and repayment history. This assessment may be updated periodically.",
  },
  {
    title: "3. Repayment",
    body: "Repayments are due on the dates shown in your loan schedule. Late or missed payments may affect your eligibility and future access to credit.",
  },
  {
    title: "4. Data & policy",
    body: "We collect bank, identity, and usage data solely to assess creditworthiness and service your loan. Your data is encrypted and never sold to third parties.",
  },
  {
    title: "5. Termination",
    body: "You may cancel a pending application at any time before disbursement at no cost. Active loans must be repaid in full according to the agreed schedule.",
  },
];

export default function TermsPrivacy() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.title}>Terms & Privacy</Text>
      <Text style={styles.updated}>Last updated 5 Jun 2026</Text>

      <View style={styles.card}>
        {SECTIONS.map((section, i) => (
          <View
            key={section.title}
            style={[
              styles.section,
              i === SECTIONS.length - 1 && { marginBottom: 0 },
            ]}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}
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
  updated: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  sectionBody: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 19,
  },
});