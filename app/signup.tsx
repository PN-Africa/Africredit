import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSendCode = () => {
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!["70", "80", "81"].includes(phoneNumber.substring(0, 2))) {
      alert("Phone number must start with 70, 80 or 81.");
      return;
    }

    // Continue to OTP page
    router.push({
      pathname: "/otp",
      params: {
        phone: phoneNumber,
      },
    });
  };
  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Step indicator */}
      <Text style={styles.stepText}>
        Create Your Account
        <Text style={styles.dot}> • </Text>
        <Text style={styles.step}>Step 1 of 3</Text>
      </Text>

      {/* Heading */}
      <Text style={styles.title}>What's your number?</Text>

      <Text style={styles.subtitle}>
        We'll send you a code to verify it's really you.
      </Text>

      {/* Phone number */}
      <Text style={styles.label}>Phone number</Text>

      <View style={styles.phoneInput}>
        <Text style={styles.countryCode}>+234</Text>

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) => {
            const numbersOnly = text.replace(/[^0-9]/g, "");
            setPhoneNumber(numbersOnly);
          }}
          placeholder="234 345 4567"
          placeholderTextColor="#777"
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
      {/* Terms */}
      <Text style={styles.terms}>
        By continuing, you agree to AfriCredit's Terms of service and privacy
        policy
      </Text>

      {/* Send code */}
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF3",
    paddingHorizontal: 36,
    paddingTop: 30,
  },

  backButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },

  backArrow: {
    fontSize: 32,
    color: "#111",
  },

  stepText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#28A982",
    marginBottom: 36,
  },

  dot: {
    color: "#28A982",
  },

  step: {
    color: "#62BFA3",
    fontWeight: "400",
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 21,
    color: "#777",
    marginBottom: 38,
  },

  label: {
    fontSize: 20,
    color: "#333",
    marginBottom: 12,
  },

  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 14,
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },

  countryCode: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginRight: 15,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: "#111",
  },

  terms: {
    fontSize: 17,
    lineHeight: 25,
    color: "#777",
    marginTop: 14,
  },

  button: {
    position: "absolute",
    bottom: 32,
    left: 36,
    right: 36,
    height: 82,
    borderRadius: 18,
    backgroundColor: "#28A982",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "700",
  },
});
