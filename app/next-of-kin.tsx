import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function NextOfKin() {
  const router = useRouter();

  // Information coming from Personal Details
  const { bvn, fullName, dateOfBirth, state, address, idType, idNumber } =
    useLocalSearchParams<{
      bvn?: string;
      fullName?: string;
      dateOfBirth?: string;
      state?: string;
      address?: string;
      idType?: string;
      idNumber?: string;
    }>();

  // Next of Kin details
  const [nextOfKinName, setNextOfKinName] = useState("");
  const [relationship, setRelationship] = useState("Parent");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nin, setNin] = useState("");
  const [nextOfKinAddress, setNextOfKinAddress] = useState("");

  const [showRelationships, setShowRelationships] = useState(false);

  const relationships = [
    "Parent",
    "Spouse",
    "Sibling",
    "Child",
    "Relative",
    "Friend",
    "Other",
  ];

  // Nigerian mobile number validation
  const isValidNigerianPhone = (phone: string) => {
    const nigerianMobilePattern = /^(070|071|080|081|090|091)\d{8}$/;

    return nigerianMobilePattern.test(phone);
  };

  // Handle phone number
  const handlePhoneChange = (text: string) => {
    // Numbers only
    const numbersOnly = text.replace(/[^0-9]/g, "");

    // Maximum 11 digits
    setPhoneNumber(numbersOnly.slice(0, 11));
  };

  // Handle NIN
  const handleNinChange = (text: string) => {
    // Numbers only
    const numbersOnly = text.replace(/[^0-9]/g, "");

    // NIN is exactly 11 digits
    setNin(numbersOnly.slice(0, 11));
  };

  const handleContinue = () => {
    // Next of Kin name
    if (!nextOfKinName.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter your next of kin's full legal name.",
      );
      return;
    }

    // Phone number length
    if (phoneNumber.length !== 11) {
      Alert.alert(
        "Invalid phone number",
        "Please enter a valid 11-digit Nigerian mobile number.",
      );
      return;
    }

    // Nigerian phone number format
    if (!isValidNigerianPhone(phoneNumber)) {
      Alert.alert(
        "Invalid phone number",
        "Please enter a valid Nigerian mobile number starting with 070, 071, 080, 081, 090, or 091.",
      );
      return;
    }

    // NIN
    if (nin.length !== 11) {
      Alert.alert(
        "Invalid NIN",
        "Please enter your next of kin's 11-digit NIN.",
      );
      return;
    }

    // Address
    if (!nextOfKinAddress.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter your next of kin's address.",
      );
      return;
    }

    // Continue to Business Details
    router.push({
      pathname: "/business-details",
      params: {
        // Personal Details
        bvn: bvn ?? "",
        fullName: fullName ?? "",
        dateOfBirth: dateOfBirth ?? "",
        state: state ?? "",
        address: address ?? "",
        idType: idType ?? "",
        idNumber: idNumber ?? "",

        // Next of Kin Details
        nextOfKinName,
        relationship,
        nextOfKinPhone: phoneNumber,
        nextOfKinNin: nin,
        nextOfKinAddress,
      },
    });
  };

  const isFormComplete =
    nextOfKinName.trim().length > 0 &&
    phoneNumber.length === 11 &&
    isValidNigerianPhone(phoneNumber) &&
    nin.length === 11 &&
    nextOfKinAddress.trim().length > 0;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Back Button */}
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        {/* Progress */}
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>Verify your identity</Text>

          <Text style={styles.dot}>•</Text>

          <Text style={styles.stepText}>Step 4 of 5</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Tell us about your next of kin</Text>

        {/* Full Name */}
        <Text style={styles.label}>Full legal name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter their full legal name"
          placeholderTextColor="#747474"
          value={nextOfKinName}
          onChangeText={setNextOfKinName}
        />

        {/* Relationship */}
        <Text style={styles.label}>Relationship</Text>

        <Pressable
          style={styles.selectInput}
          onPress={() => setShowRelationships(true)}
        >
          <Text style={styles.selectText}>{relationship}</Text>

          <Text style={styles.arrow}>⌄</Text>
        </Pressable>

        {/* Phone Number */}
        <Text style={styles.label}>Phone number</Text>

        <TextInput
          style={styles.input}
          placeholder="08012345678"
          placeholderTextColor="#747474"
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          maxLength={11}
        />

        {/* Phone validation message */}
        {phoneNumber.length > 0 && phoneNumber.length < 11 && (
          <Text style={styles.validationText}>
            Phone number must contain 11 digits.
          </Text>
        )}

        {phoneNumber.length === 11 && !isValidNigerianPhone(phoneNumber) && (
          <Text style={styles.validationText}>
            Enter a valid Nigerian mobile number.
          </Text>
        )}

        {/* NIN */}
        <Text style={styles.label}>NIN</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter their 11-digit NIN"
          placeholderTextColor="#747474"
          value={nin}
          onChangeText={handleNinChange}
          keyboardType="number-pad"
          maxLength={11}
        />

        {/* NIN validation message */}
        {nin.length > 0 && nin.length < 11 && (
          <Text style={styles.validationText}>NIN must contain 11 digits.</Text>
        )}

        {/* Address */}
        <Text style={styles.label}>Address</Text>

        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Enter their residential address"
          placeholderTextColor="#747474"
          value={nextOfKinAddress}
          onChangeText={setNextOfKinAddress}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Continue Button */}
      <Pressable
        style={[
          styles.continueButton,
          !isFormComplete && styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>

      {/* Relationship Modal */}
      <Modal
        visible={showRelationships}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRelationships(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select relationship</Text>

            {relationships.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.relationshipItem}
                onPress={() => {
                  setRelationship(item);
                  setShowRelationships(false);
                }}
              >
                <Text style={styles.relationshipText}>{item}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowRelationships(false)}
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

  scrollContent: {
    paddingBottom: 120,
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

  addressInput: {
    height: 90,
    paddingTop: 15,
    paddingBottom: 15,
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

  validationText: {
    color: "#C62828",
    fontSize: 14,
    marginTop: -14,
    marginBottom: 18,
  },

  bottomSpace: {
    height: 30,
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

  continueButtonDisabled: {
    opacity: 0.5,
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

  relationshipItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  relationshipText: {
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
