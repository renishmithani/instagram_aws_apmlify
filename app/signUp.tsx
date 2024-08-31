import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleSignUp } from "@/awsUtils";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const result = await handleSignUp({
        username: email,
        email: email,
        password: pass,
      });
      if (result?.userId) {
        router.push({
          pathname: "/verificationScreen",
          params: {
            ...result,
            email,
            userName: email,
          },
        });
      }

      console.log("RESULT", result);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="light" animated backgroundColor="white" />
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center bg-white align-center mx-4">
          <View className="w-full h-[120px]">
            <Image
              className="w-full h-full"
              resizeMode="contain"
              source={require("../assets/images/instagramLogo.png")}
            />
          </View>
          <View>
            <View className="mb-[20]">
              <CustomTextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter email"
                containerStyle="mb-4"
              />
              <CustomTextInput
                value={pass}
                onChangeText={(text) => setPass(text)}
                placeholder="Enter password"
                containerStyle="mb-2"
                inputType="password"
              />
            </View>
            <View>
              <CustomButton
                loading={isLoading}
                title="Create account"
                onPress={() => handleRegister()}
              />
            </View>
          </View>
          <View className="justify-center items-center my-8 flex-row">
            <Text className="ml-2 text-center text-sm text-[#000000] text-opacity-0">
              Already have an account?{" "}
              <Text
                onPress={() => router.back()}
                className="text-sm text-blue-500"
              >
                Sign In.
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SignUp;
