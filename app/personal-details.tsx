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

export default function PersonalDetails() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [state, setState] = useState("Lagos");
  const [showStates, setShowStates] = useState(false);

  const states = [
    "Lagos",
    "Abuja",
    "Delta",
    "Anambra",
    "Edo",
    "Rivers",
    "Oyo",
    "Kano",
    "Enugu",
  ];

  const handleContinue = () => {
    router.push("./business-details");
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

        <Text style={styles.stepText}>Step 3 of 4</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Tell us a bit about you</Text>

      {/* Full Name */}
      <Text style={styles.label}>Full legal name</Text>

      <TextInput
        style={styles.input}
        placeholder="As it appears on your BVN"
        placeholderTextColor="#747474"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Date of Birth */}
      <Text style={styles.label}>Date of birth</Text>

      <TextInput
        style={styles.input}
        placeholder="DD / MM / YYYY"
        placeholderTextColor="#747474"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        keyboardType="numeric"
      />

      {/* State */}
      <Text style={styles.label}>State of residence</Text>

      <Pressable style={styles.selectInput} onPress={() => setShowStates(true)}>
        <Text style={styles.selectText}>{state}</Text>

        <Text style={styles.arrow}>⌄</Text>
      </Pressable>

      {/* Continue Button */}
      <Pressable style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>

      {/* States Modal */}
      <Modal visible={showStates} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select your state</Text>

            {states.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.stateItem}
                onPress={() => {
                  setState(item);
                  setShowStates(false);
                }}
              >
                <Text style={styles.stateText}>{item}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowStates(false)}
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
  },

  selectText: {
    fontSize: 16,
    color: "#555",
  },

  arrow: {
    fontSize: 26,
    color: "#1F2328",
  },

  continueButton: {
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

  stateItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  stateText: {
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
