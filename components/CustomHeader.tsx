import React from "react";
import { StyleSheet, View } from "react-native";
import Logo from "./Logo";
import Divider from "./Divider";

interface CustomHeader {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  label?: string;
}

const CustomHeader = ({
  headerLeft = <></>,
  headerRight = <></>,
  label = "",
}) => {
  return (
    <>
      <View className="h-[55px] w-full justify-between flex-row px-4 items-center bg-white border-b-2 border-gray-200">
        <View className="w-[25%]">{headerLeft}</View>
        <View className="items-center w-[50%]">
          <Logo />
        </View>
        <View className="w-[25%] items-end">{headerRight}</View>
      </View>
      {/* <Divider dividerStyle="opacity-20" /> */}
    </>
  );
};

const styles = StyleSheet.create({});

export default CustomHeader;
