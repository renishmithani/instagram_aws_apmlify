import CustomHeader from "@/components/CustomHeader";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <View className="flex-1">
      <CustomHeader />
      <View className="flex-1 justify-center bg-white">
        <Text className="text-center text-gray-700 font-bold text-base">
          Coming Soon
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Index;
