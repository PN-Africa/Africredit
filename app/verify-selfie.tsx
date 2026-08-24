import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import selfieIcon from "../assets/images/Selfiicon2.png";

export default function VerifySelfie() {
  const router = useRouter();

  const [showCamera, setShowCamera] = useState(false);
  const [selfieUri, setSelfieUri] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();

  // Open camera
  const openCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();

      if (!result.granted) {
        return;
      }
    }

    setShowCamera(true);
  };

  // Take selfie
  const takeSelfie = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (photo?.uri) {
        setSelfieUri(photo.uri);
        setShowCamera(false);
      }
    }
  };

  // CAMERA SCREEN
  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        {/*circular camera preview */}

        <CameraView ref={cameraRef} style={styles.camera} facing="front" />

        <View style={styles.maskTop} />
        <View style={styles.maskLeft} />
        <View style={styles.maskRight} />
        <View style={styles.maskBottom} />

        {/*Dashed circle border*/}

        <View style={styles.cameraCircleBorder} />

        {/* Capture button */}
        <TouchableOpacity style={styles.captureButton} onPress={takeSelfie}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        {/* Close camera */}
        <TouchableOpacity
          style={styles.closeCameraButton}
          onPress={() => setShowCamera(false)}
        >
          <Text style={styles.closeCameraText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Step indicator */}
      <Text style={styles.stepText}>
        Verify your identity
        <Text style={styles.dot}> • </Text>
        Step 2 of 4
      </Text>

      {/* Title */}
      <Text style={styles.title}>Take a quick selfie</Text>

      {/* Description */}
      <Text style={styles.description}>
        This confirms the person applying matches{"\n"}
        your BVN records
      </Text>

      {/* Selfie frame */}
      <View style={styles.selfieCircle}>
        <Image source={selfieIcon} style={styles.personIcon} />
      </View>

      {/* Checklist */}
      <View style={styles.checklist}>
        {/* First item */}
        <View style={styles.checkRow}>
          <View style={styles.checkCircle}>
            <Text style={styles.check}>✓</Text>
          </View>

          <Text style={styles.checkText}>Good lighting,face the camera</Text>
        </View>

        {/* Second item */}
        <View style={styles.checkRow}>
          <View style={styles.checkCircle}>
            <Text style={styles.check}>✓</Text>
          </View>

          <Text style={styles.checkText}>Remove glasses or hats</Text>
        </View>

        {/* Third item */}
        <View style={styles.checkRow}>
          <View style={styles.checkCircle}>
            <Text style={styles.check}>✓</Text>
          </View>

          <Text style={styles.checkText}>
            Keep your whole face in the frame
          </Text>
        </View>
      </View>

      {/* Captured selfie */}
      {selfieUri && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: selfieUri }} style={styles.previewImage} />
        </View>
      )}

      {/* Open camera button */}
      {!selfieUri && (
        <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
          <Text style={styles.cameraButtonText}>Open Camera</Text>
        </TouchableOpacity>
      )}

      {/* Retake / Continue */}
      {selfieUri && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => setSelfieUri(null)}
          >
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              // We will connect this to Step 3 later
              console.log("Selfie confirmed");
            }}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF2",
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 32,
    boxSizing: "border-box",
  },

  backButton: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 30,
    color: "#111111",
    fontWeight: 700,
  },

  stepText: {
    marginTop: 4,
    fontSize: 18,
    lineHeight: 24,
    color: "#39A884",
  },

  dot: {
    fontSize: 20,
    color: "#25A879",
  },

  title: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: "#111111",
  },

  description: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    color: "#707070",
    width: "100%",
  },

  selfieCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#22A67A",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  personIcon: {
    width: 40,
    height: 40,
    paddingTop: 79,
    paddingLeft: 79.5,
    color: "#22A67A",
  },

  checklist: {
    marginTop: 18,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  checkCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EAF5E7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  check: {
    fontSize: 20,
    color: "#29AA83",
    fontWeight: "600",
  },

  checkText: {
    flex: 1,
    fontSize: 15,
    color: "#222222",
  },

  cameraButton: {
    position: "absolute",
    left: 36,
    right: 36,
    bottom: 32,
    height: 82,
    borderRadius: 17,
    backgroundColor: "#29AA83",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  cameraButtonText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF9EF",
  },
  /* Camera */
  cameraContainer: {
    flex: 1,
    backgroundColor: "#FFF9EF",
    overflow: "hidden",
  },

  camera: {
    flex: 1,
    overflow: "hidden",
  },

  focusCircle: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    borderWidth: 3,
    borderColor: "#29AA83",
    borderStyle: "dashed",
    alignSelf: "center",
    top: "25%",
  },

  /* Capture button */
  captureButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  captureButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#29AA83",
  },

  cameraCircleBorder: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    borderWidth: 3,
    borderColor: "#29AA83",
    borderStyle: "dashed",
    alignSelf: "center",
    top: 180,
  },

  /* Close camera */
  closeCameraButton: {
    position: "absolute",
    top: 50,
    left: 25,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  closeCameraText: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 36,
  },

  /* Selfie preview */
  previewContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  /* Actions */
  actionContainer: {
    position: "absolute",
    left: 36,
    right: 36,
    bottom: 32,
    flexDirection: "row",
    gap: 12,
  },

  retakeButton: {
    flex: 1,
    height: 60,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#29AA83",
    alignItems: "center",
    justifyContent: "center",
  },

  retakeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#29AA83",
  },

  continueButton: {
    flex: 1,
    height: 60,
    borderRadius: 17,
    backgroundColor: "#29AA83",
    alignItems: "center",
    justifyContent: "center",
  },

  continueText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  maskTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: "#FFF9EF",
  },

  maskLeft: {
    position: "absolute",
    top: 180,
    left: 0,
    width: 26,
    height: 340,
    backgroundColor: "#FFF9EF",
  },

  maskRight: {
    position: "absolute",
    top: 180,
    right: 0,
    width: 26,
    height: 340,
    backgroundColor: "#FFF9EF",
  },

  maskBottom: {
    position: "absolute",
    top: 520,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF9EF",
  },
});
