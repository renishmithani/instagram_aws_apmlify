import { Stack } from "expo-router/stack";
import { UserSchema } from "../database/schema";
import { RealmProvider } from "@realm/react";

export default function Layout() {
  const userId = null;

  const AuthStack = () => (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="verificationScreen" />
      <Stack.Screen name="forgotPass" />
    </Stack>
  );

  const AuthenticatedStack = () => (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );

  return (
    <>
      <RealmProvider schema={[UserSchema]}>
        {userId ? <AuthStack /> : <AuthenticatedStack />}
      </RealmProvider>
    </>
  );
}
