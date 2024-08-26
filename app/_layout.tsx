import { Stack } from "expo-router/stack";

export default function Layout() {
  const userId = null;

  const AuthStack = (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="verificationScreen" />
      <Stack.Screen name="forgotPass" />
    </Stack>
  );

  const AuthenticatedStack = (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );

  return userId ? AuthStack : AuthenticatedStack;
}
