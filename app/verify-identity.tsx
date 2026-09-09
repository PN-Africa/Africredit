import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerifyIdentity() {
  const router = useRouter();

  const [bvn, setBvn] = useState("");

  const handleConfirm = () => {
    // Make sure the BVN is exactly 11 digits
    if (bvn.length !== 11) {
      Alert.alert(
        "Invalid BVN",
        "Please enter your 11-digit Bank Verification Number.",
      );
      return;
    }

    // Pass the BVN to the next step.
    // We will use it later when submitting the complete KYC payload.
    router.push({
      pathname: "/verify-selfie",
      params: {
        bvn,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Step indicator */}
      <Text style={styles.stepText}>
        Verify your identity <Text style={styles.dot}>•</Text> Step 1 of 4
      </Text>

      {/* Heading */}
      <Text style={styles.title}>Let’s confirm it’s really you</Text>

      {/* Description */}
      <Text style={styles.description}>
        Required by Nigerian lending regulations and it keeps your account
        secure.
      </Text>

      {/* BVN label */}
      <Text style={styles.label}>Bank Verification Number (BVN)</Text>

      {/* BVN input */}
      <TextInput
        style={styles.input}
        placeholder="23456789023"
        placeholderTextColor="#777777"
        keyboardType="number-pad"
        maxLength={11}
        value={bvn}
        onChangeText={(text) => {
          // Only allow numbers
          const numbersOnly = text.replace(/[^0-9]/g, "");
          setBvn(numbersOnly);
        }}
      />

      {/* BVN instruction */}
      <Text style={styles.instruction}>
        Don’t have it handy? Dial *565*0# on your registered line to get your
        BVN.
      </Text>

      {/* Information box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoIcon}>♙</Text>

        <Text style={styles.infoText}>
          Your BVN is used only to confirm your identity. AfriCredit cannot
          access or move money from any linked bank account.
        </Text>
      </View>

      {/* Confirm button */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          bvn.length !== 11 && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF2",
    paddingTop: 56,
    paddingHorizontal: 36,
    paddingBottom: 32,
  },

  backButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 30,
    color: "#111111",
  },

  stepText: {
    marginTop: 27,
    fontSize: 18,
    lineHeight: 24,
    color: "#39A884",
  },

  dot: {
    fontSize: 20,
    color: "#25A879",
  },

  title: {
    marginTop: 34,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: "#111111",
  },

  description: {
    marginTop: 8,
    fontSize: 18,
    lineHeight: 25,
    color: "#707070",
  },

  label: {
    marginTop: 35,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
    color: "#333333",
  },

  input: {
    height: 70,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    marginTop: 14,
    paddingHorizontal: 26,
    fontSize: 18,
    color: "#333333",
  },

  instruction: {
    marginTop: 9,
    fontSize: 17,
    lineHeight: 24,
    color: "#707070",
  },

  infoBox: {
    marginTop: 26,
    minHeight: 138,
    borderRadius: 14,
    backgroundColor: "#EAF5E7",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  infoIcon: {
    fontSize: 25,
    color: "#29A981",
    marginRight: 16,
  },

  infoText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 25,
    color: "#707070",
  },

  confirmButton: {
    position: "absolute",
    left: 36,
    right: 36,
    bottom: 32,
    height: 82,
    borderRadius: 17,
    backgroundColor: "#29AA83",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButtonDisabled: {
    opacity: 0.5,
  },

  confirmText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
