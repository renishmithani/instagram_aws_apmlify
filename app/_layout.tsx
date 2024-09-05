import { currentAuthenticatedUser } from "@/awsUtils";
import { event } from "@/event";
import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const AuthStack = () => (
  <Stack
    // initialRouteName="verificationScreen"
    screenOptions={{ headerShown: false }}
  >
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

export default function Layout() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<null | string>(null);

  const checkUserLogin = async () => {
    try {
      setLoading(true);
      const result = await currentAuthenticatedUser();
      setUserId(result?.userId || null);
    } catch (error) {
      setUserId(null);
      console.log("checkUserLogin Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserLogin();
    // Event call
    event.on("authCheck", checkUserLogin);
    return () => {
      event.off("authCheck", checkUserLogin);
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="skyblue" />
      </View>
    );
  }

  return <>{userId ? <AuthenticatedStack /> : <AuthStack />}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
