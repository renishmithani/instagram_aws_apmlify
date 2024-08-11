import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface CustomButton {
  title?: string;
  onPress?: () => void;
  containerStyle?: string;
  textStyles?: string;
  loading?: boolean;
}

const CustomButton = ({
  title = "",
  onPress = () => null,
  containerStyle = "",
  textStyles = "",
  loading = false,
}: CustomButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={loading}
      className={`w-full border border-blue-400 bg-[#3797EF] rounded-md min-h-[50px] justify-center items-center ${containerStyle} `}
    >
      <Text
        className={`text-white font-semibold items-center justify-center text-lg ${textStyles}`}
      >
        {loading ? <ActivityIndicator color="white" /> : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50, // Changed height for better usability
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff", // Example background color
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#fff", // White text color for contrast
    fontSize: 16,
  },
});

export default CustomButton;
