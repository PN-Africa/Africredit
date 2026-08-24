import { Stack } from "expo-router";
import { LoanProvider } from "../contexts/LoanContext";

export default function RootLayout() {
  return (
    <LoanProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LoanProvider>
  );
}