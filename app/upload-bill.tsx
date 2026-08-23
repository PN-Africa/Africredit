import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { ArrowLeft, UploadCloud, X, Check } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";

const REQUIREMENTS = [
  "Be less than 3 months old",
  "Be either Electricity, water or waste (LAWMA)",
  "Clearly show your full name and address",
  "Be a photo or clear scan (JPG, PNG or PDF)",
];

export default function UploadBill() {
  const { uploadBill } = useLoan();
  const [fileName, setFileName] = useState("");

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    setFileName(result.assets[0].name);
  };

  const handleSubmit = () => {
    if (!fileName) return;
    uploadBill(fileName);
    router.push("/upload-bill-success");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.title}>Confirm your address</Text>
      <Text style={styles.subtitle}>
        A recent utility bill helps verify where your business operates and
        strengthens your eligibility score
      </Text>

      <View style={styles.requirementsBox}>
        <Text style={styles.requirementsTitle}>Your bill must:</Text>
        {REQUIREMENTS.map((req) => (
          <View key={req} style={styles.requirementRow}>
            <Check size={14} color="#22A67A" />
            <Text style={styles.requirementText}>{req}</Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.uploadArea} onPress={pickFile}>
        <UploadCloud size={22} color="#6b7280" />
        <Text style={styles.uploadTitle}>Upload your utility bill</Text>
        <Text style={styles.uploadSubtitle}>JPG, PNG or PDF</Text>
        <View style={styles.uploadButtons}>
          <View style={styles.uploadButtonOutline}>
            <Text style={styles.uploadButtonText}>Take photo</Text>
          </View>
          <View style={styles.uploadButtonOutline}>
            <Text style={styles.uploadButtonText}>Choose file</Text>
          </View>
        </View>
      </Pressable>

      {fileName ? (
        <View style={styles.fileRow}>
          <View>
            <Text style={styles.fileName}>{fileName}</Text>
            <Text style={styles.fileStatus}>Uploaded</Text>
          </View>
          <Pressable onPress={() => setFileName("")}>
            <X size={18} color="#9ca3af" />
          </Pressable>
        </View>
      ) : null}

      <View style={{ flex: 1 }} />

      <Pressable
        style={[styles.submitButton, !fileName && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!fileName}
      >
        <Text style={styles.submitText}>Submit bill</Text>
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
    paddingBottom: 32,
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
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 8,
    lineHeight: 19,
  },
  requirementsBox: {
    backgroundColor: "#E3F5EC",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 8,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  requirementText: {
    fontSize: 12,
    color: "#166534",
  },
  uploadArea: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#FFFFFF",
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginTop: 10,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
  uploadButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  uploadButtonOutline: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  uploadButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  fileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 14,
  },
  fileName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  fileStatus: {
    fontSize: 11,
    color: "#22A67A",
    marginTop: 2,
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
});