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

export default function PersonalDetails() {
  const router = useRouter();

  const { bvn } = useLocalSearchParams<{ bvn?: string }>();

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [state, setState] = useState("Lagos");
  const [address, setAddress] = useState("");

  const [showStates, setShowStates] = useState(false);

  const [idType, setIdType] = useState("NIN");
  const [idNumber, setIdNumber] = useState("");
  const [showIdTypes, setShowIdTypes] = useState(false);

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

  const idTypes = ["NIN", "International Passport", "Driver's License"];

  // Date of birth: numbers only, maximum 8 digits
  // Displayed as DD / MM / YYYY
  const handleDateOfBirthChange = (text: string) => {
    const numbersOnly = text.replace(/[^0-9]/g, "");

    const limited = numbersOnly.slice(0, 8);

    let formatted = limited;

    if (limited.length > 4) {
      formatted = `${limited.slice(0, 2)} / ${limited.slice(
        2,
        4,
      )} / ${limited.slice(4)}`;
    } else if (limited.length > 2) {
      formatted = `${limited.slice(0, 2)} / ${limited.slice(2)}`;
    }

    setDateOfBirth(formatted);
  };

  // Identification number: numbers only
  // NIN is strictly 11 digits
  const handleIdNumberChange = (text: string) => {
    const numbersOnly = text.replace(/[^0-9]/g, "");

    if (idType === "NIN") {
      setIdNumber(numbersOnly.slice(0, 11));
      return;
    }

    setIdNumber(numbersOnly);
  };

  const handleContinue = () => {
    // Full name
    if (!fullName.trim()) {
      Alert.alert("Missing information", "Please enter your full legal name.");
      return;
    }

    // Date of birth
    const dateNumbersOnly = dateOfBirth.replace(/[^0-9]/g, "");

    if (dateNumbersOnly.length !== 8) {
      Alert.alert(
        "Invalid date of birth",
        "Please enter your date of birth in DD / MM / YYYY format.",
      );
      return;
    }

    // State
    if (!state.trim()) {
      Alert.alert(
        "Missing information",
        "Please select your state of residence.",
      );
      return;
    }

    // Address
    if (!address.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter your residential address.",
      );
      return;
    }

    // NIN
    if (idType === "NIN" && idNumber.length !== 11) {
      Alert.alert("Invalid NIN", "NIN must contain exactly 11 digits.");
      return;
    }

    // Other identification types
    if (idType !== "NIN" && !idNumber.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter your identification number.",
      );
      return;
    }

    // Continue to Next of Kin
    router.push({
      pathname: "/next-of-kin",
      params: {
        bvn: bvn ?? "",
        fullName,
        dateOfBirth,
        state,
        address,
        idType,
        idNumber,
      },
    });
  };

  const isFormComplete =
    fullName.trim().length > 0 &&
    dateOfBirth.replace(/[^0-9]/g, "").length === 8 &&
    state.trim().length > 0 &&
    address.trim().length > 0 &&
    (idType === "NIN" ? idNumber.length === 11 : idNumber.trim().length > 0);

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

          <Text style={styles.stepText}>Step 3 of 5</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Tell us a bit about you</Text>

        {/* Full Legal Name */}
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
          onChangeText={handleDateOfBirthChange}
          keyboardType="number-pad"
          maxLength={16}
        />

        {/* State of Residence */}
        <Text style={styles.label}>State of residence</Text>

        <Pressable
          style={styles.selectInput}
          onPress={() => setShowStates(true)}
        >
          <Text style={styles.selectText}>{state}</Text>

          <Text style={styles.arrow}>⌄</Text>
        </Pressable>

        {/* Residential Address */}
        <Text style={styles.label}>Residential address</Text>

        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Enter your residential address"
          placeholderTextColor="#747474"
          value={address}
          onChangeText={setAddress}
          multiline
          textAlignVertical="top"
        />

        {/* Identification Type */}
        <Text style={styles.label}>Identification type</Text>

        <Pressable
          style={styles.selectInput}
          onPress={() => setShowIdTypes(true)}
        >
          <Text style={styles.selectText}>{idType}</Text>

          <Text style={styles.arrow}>⌄</Text>
        </Pressable>

        {/* Identification Number */}
        <Text style={styles.label}>Identification number</Text>

        <TextInput
          style={styles.input}
          placeholder={
            idType === "NIN"
              ? "Enter your 11-digit NIN"
              : "Enter your ID number"
          }
          placeholderTextColor="#747474"
          value={idNumber}
          onChangeText={handleIdNumberChange}
          keyboardType="number-pad"
          maxLength={idType === "NIN" ? 11 : 30}
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

      {/* State Selection Modal */}
      <Modal
        visible={showStates}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStates(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select your state</Text>

            {states.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.optionItem}
                onPress={() => {
                  setState(item);
                  setShowStates(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
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

      {/* Identification Type Modal */}
      <Modal
        visible={showIdTypes}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowIdTypes(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select identification type</Text>

            {idTypes.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.optionItem}
                onPress={() => {
                  setIdType(item);
                  setIdNumber("");
                  setShowIdTypes(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowIdTypes(false)}
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

  /*
   * Same address box dimensions and behavior
   * as the Next of Kin page.
   */
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

  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  optionText: {
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
