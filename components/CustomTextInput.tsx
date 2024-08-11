import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";

type InputType = "none" | "password" | "email";

interface CustomTextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: string;
  inputStyle?: string;
  placeholder?: string;
  error?: string;
  inputType?: InputType;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value = "",
  onChangeText = () => null,
  containerStyle = "",
  inputStyle = "",
  placeholder = "",
  error = "",
  inputType = "none",
}) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <>
      <View
        className={`flex flex-row items-center w-full h-14 px-4 rounded-md border-2 border-gray-200 focus:border-secondary ${containerStyle}`}
      >
        <TextInput
          value={value}
          className={`text-base mt-0.5 text-black flex-1 ${inputStyle}`}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={inputType === "password" && !showPass}
        />
        {inputType === "password" && value ? (
          <Text
            onPress={() => setShowPass(!showPass)}
            className="text-black mx-2 text-base"
          >
            {showPass ? "Hide" : "Show"}
          </Text>
        ) : null}
      </View>
      {error ? <Text className="mx-2 my-1 text-red-500">{error}</Text> : null}
    </>
  );
};

export default CustomTextInput;
