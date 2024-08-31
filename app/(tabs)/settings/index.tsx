import { handleSignOut } from "@/awsUtils";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { event } from "@/event";
import Authenticated from "@/hoc/Authenticated";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  const route = useRouter();
  const handleLogout = async () => {
    try {
      const result = await handleSignOut();
      event.emit("authCheck");
      console.log("RESULT", result);
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <CustomHeader />
      <View className="flex-1 bg-white justify-center">
        <CustomButton title="Logout" onPress={handleLogout} />
      </View>
    </>
  );
};

export default Authenticated(Index);
