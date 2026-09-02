import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, X as XIcon, Check } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";
import { calcLoanTerms, formatCurrency } from "../lib/loanMath";

export default function ApplyLoanReview() {
  const { application, boost, status, submitApplication, terminateApplication } =
    useLoan();
  const [agreed, setAgreed] = useState(false);
  const [terminateModalVisible, setTerminateModalVisible] = useState(false);

  useEffect(() => {
    if (!application) {
      router.replace("/(tabs)/home");
    }
  }, [application]);

  if (!application) {
    return null;
  }

  const { totalInterest, totalRepayable, monthlyRepayment } = calcLoanTerms(
    application.amount,
    application.durationMonths
  );

  const bankLabel = boost.bankConnected
    ? `${boost.bankName} *****1234`
    : "GTBank *****1234";

  const details = [
    { label: "Amount", value: formatCurrency(application.amount) },
    { label: "Purpose", value: application.purpose },
    {
      label: "Duration",
      value: `${application.durationMonths} month${
        application.durationMonths > 1 ? "s" : ""
      }`,
    },
    { label: "Interest rate", value: "3.5% / month" },
    { label: "Total repayment", value: formatCurrency(totalRepayable) },
    {
      label: "Monthly repayment",
      value: `${formatCurrency(monthlyRepayment)} / month`,
    },
    { label: "Disbursed to", value: bankLabel },
  ];

  const isDraft = status === "eligible";

  const handleSubmit = () => {
    if (!agreed) return;
    submitApplication();
    router.push("/apply-loan-submitted");
  };

  const handleConfirmTerminate = () => {
    setTerminateModalVisible(false);
    terminateApplication();
    router.replace("/terminate-success");
  };

  const handleSimulateApproval = () => {
    router.push("/loan-approved");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#111827" />
        </Pressable>
        {!isDraft && (
          <View style={styles.reviewBadge}>
            <Text style={styles.reviewBadgeText}>Under Review</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>Review your application</Text>

      <View style={styles.detailsCard}>
        {details.map((item, i) => (
          <View
            key={item.label}
            style={[
              styles.detailRow,
              i === details.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Text style={styles.detailLabel}>{item.label}</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {isDraft && (
        <Pressable
          style={styles.agreeRow}
          onPress={() => setAgreed((v) => !v)}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Check size={12} color="#fff" strokeWidth={3} />}
          </View>
          <Text style={styles.agreeText}>
            I confirm the details above are correct and agree to AfriCredit's
            loan agreement and repayment terms.
          </Text>
        </Pressable>
      )}

      <View style={{ flex: 1 }} />

      {isDraft ? (
        <Pressable
          style={[styles.submitButton, !agreed && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!agreed}
        >
          <Text style={styles.submitText}>Submit application</Text>
        </Pressable>
      ) : (
        <>
          <Pressable style={styles.demoButton} onPress={handleSimulateApproval}>
            <Text style={styles.demoButtonText}>Demo: Simulate approval</Text>
          </Pressable>
          <Pressable
            style={styles.terminateButton}
            onPress={() => setTerminateModalVisible(true)}
          >
            <Text style={styles.terminateText}>Terminate application</Text>
          </Pressable>
        </>
      )}

      <Modal
        visible={terminateModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTerminateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <XIcon size={26} color="#E7514F" />
            </View>
            <Text style={styles.modalTitle}>Terminate this application?</Text>
            <Text style={styles.modalSubtitle}>
              This will permanently cancel your request for{" "}
              {formatCurrency(application.amount)}. You'll need to start a
              new application if you change your mind.
            </Text>

            <Pressable
              style={styles.modalConfirmButton}
              onPress={handleConfirmTerminate}
            >
              <Text style={styles.modalConfirmText}>
                Yes, terminate application
              </Text>
            </Pressable>
            <Pressable
              style={styles.modalCancelButton}
              onPress={() => setTerminateModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>No, keep application</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewBadge: {
    backgroundColor: "#FEF3E2",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  reviewBadgeText: {
    color: "#D97706",
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
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
  agreeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#22A67A",
    borderColor: "#22A67A",
  },
  agreeText: {
    flex: 1,
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 17,
  },
  submitButton: {
    backgroundColor: "#22A67A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#A7D9C4",
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  demoButton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  demoButtonText: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  terminateButton: {
    backgroundColor: "#E7514F",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  terminateText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  modalIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FDECEC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 19,
  },
  modalConfirmButton: {
    backgroundColor: "#E7514F",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  modalConfirmText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  modalCancelButton: {
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
  },
  modalCancelText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "600",
  },
});