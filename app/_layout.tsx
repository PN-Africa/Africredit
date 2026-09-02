import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LoanProvider } from "../contexts/LoanContext";
import { ProfileProvider } from "../contexts/ProfileContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProfileProvider>
        <LoanProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </LoanProvider>
      </ProfileProvider>
    </GestureHandlerRootView>
  );
}