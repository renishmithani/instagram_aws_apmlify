import React from "react";
import { StyleSheet, View } from "react-native";

const Divider = ({
  color,
  dividerStyle,
}: {
  color?: string;
  dividerStyle?: string;
}) => {
  return (
    <View
      className={`border w-full bg-${
        color || "black"
      } h-[0.5px] ${dividerStyle}`}
    />
  );
};

const styles = StyleSheet.create({});

export default Divider;
