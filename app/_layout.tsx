import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="verificationScreen" />
      <Stack.Screen name="forgotPass" />
    </Stack>
  );
}
