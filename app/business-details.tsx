import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function BusinessDetails() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Retail & trading");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [showBusinessTypes, setShowBusinessTypes] = useState(false);

  const businessTypes = [
    "Retail & trading",
    "Food & beverages",
    "Fashion",
    "Agriculture",
    "Transportation",
    "Professional services",
    "Other",
  ];

  const handleVerify = () => {
    router.push("./account-verified");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>Verify your identity</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.stepText}>Step 4 of 4</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Now, tell us about your business</Text>

      {/* Business Name */}
      <Text style={styles.label}>Business name</Text>

      <TextInput
        style={styles.input}
        placeholder="As it appears on your BVN"
        placeholderTextColor="#747474"
        value={businessName}
        onChangeText={setBusinessName}
      />

      {/* Business Type */}
      <Text style={styles.label}>Business type</Text>

      <Pressable
        style={styles.selectInput}
        onPress={() => setShowBusinessTypes(true)}
      >
        <Text style={styles.selectText}>{businessType}</Text>
        <Text style={styles.arrow}>⌄</Text>
      </Pressable>

      {/* Monthly Income */}
      <Text style={styles.label}>Average monthly income</Text>

      <TextInput
        style={styles.input}
        placeholder="150,000"
        placeholderTextColor="#747474"
        value={monthlyIncome}
        onChangeText={setMonthlyIncome}
        keyboardType="numeric"
      />

      {/* Confirm Button */}
      <Pressable style={styles.confirmButton} onPress={handleVerify}>
        <Text style={styles.buttonText}>Confirm and Verify</Text>
      </Pressable>

      {/* Business Type Modal */}
      <Modal
        visible={showBusinessTypes}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select business type</Text>

            {businessTypes.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.typeItem}
                onPress={() => {
                  setBusinessType(item);
                  setShowBusinessTypes(false);
                }}
              >
                <Text style={styles.typeText}>{item}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowBusinessTypes(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
    paddingHorizontal: 24,
    paddingTop: 80,
  },

  backButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  backArrow: {
    fontSize: 28,
    color: "#1E1E1E",
    marginTop: -3,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  progressText: {
    fontSize: 16,
    color: "#2F8F76",
    fontWeight: "500",
  },

  dot: {
    fontSize: 20,
    color: "#2F8F76",
    marginHorizontal: 10,
  },

  stepText: {
    fontSize: 16,
    color: "#5F7D76",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2328",
    marginBottom: 28,
    lineHeight: 34,
  },

  label: {
    fontSize: 16,
    color: "#303030",
    marginBottom: 10,
    fontWeight: "500",
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    marginBottom: 22,
    backgroundColor: "#FFFFFF",
  },

  selectInput: {
    height: 54,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    marginBottom: 22,
  },

  selectText: {
    fontSize: 16,
    color: "#555",
  },

  arrow: {
    fontSize: 26,
    color: "#1F2328",
  },

  confirmButton: {
    height: 58,
    backgroundColor: "#2F9B7D",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1F2328",
  },

  typeItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  typeText: {
    fontSize: 17,
    color: "#333",
  },

  cancelButton: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 14,
  },

  cancelText: {
    fontSize: 17,
    color: "#2F9B7D",
    fontWeight: "600",
  },
});
