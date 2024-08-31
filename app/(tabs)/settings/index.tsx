import { handleSignOut } from "@/awsUtils";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { event } from "@/event";
import Authenticated from "@/hoc/Authenticated";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const result = await handleSignOut();
      event.emit("authCheck");
      console.log("RESULT", result);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomHeader />
      <View className="flex-1 bg-white justify-center">
        <CustomButton
          loading={isLoading}
          title="Logout"
          onPress={handleLogout}
        />
      </View>
    </>
  );
};

export default Authenticated(Index);
