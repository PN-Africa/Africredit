import { FaceDetectionProvider } from "@infinitered/react-native-mlkit-face-detection";
import { Stack } from "expo-router";
import { LoanProvider } from "../contexts/LoanContext";

export default function RootLayout() {
  return (
    <FaceDetectionProvider>
      <LoanProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </LoanProvider>
    </FaceDetectionProvider>
  );
}
