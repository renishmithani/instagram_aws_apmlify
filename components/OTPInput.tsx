import React, { useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Text,
} from "react-native";

interface OTPInputProps {
  length: number;
  value: string;
  onChange: (otp: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  error?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  value,
  onChange,
  containerStyle,
  inputStyle,
  error,
}) => {
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    let newValue = value.split("");
    newValue[index] = text;
    const otp = newValue.join("");
    onChange(otp);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !value[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View className="flex-row justify-between w-full">
        {Array(length)
          .fill("")
          .map((_, index) => (
            <TextInput
              key={index}
              ref={(input) => (inputs.current[index] = input)}
              value={value[index] || ""}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              style={[styles.input, inputStyle]}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
      </View>
      <View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    marginRight: 5,
    width: 40,
    color: "#000000",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default OTPInput;
