import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Amplify } from "aws-amplify";

import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import {
  handleResendVerificationCode,
  handleSignUpConfirmation,
} from "@/awsUtils";

import amplifyconfig from "../src/amplifyconfiguration.json";
import OTPInput from "@/components/OTPInput";

Amplify.configure(amplifyconfig);

const VerificationScreen = () => {
  const router = useRouter();
  const { userName, email } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [codeResend, setCodeResend] = useState(false);

  const [verificationCode, setVerificationCode] = useState<string>("");

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const result = await handleSignUpConfirmation({
        username: userName,
        confirmationCode: verificationCode,
      });
      if (result?.isSignUpComplete) {
        router.replace({ pathname: "/" });
      }
      console.log("RESULT", result);
    } catch (error) {
      console.log("Page error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setCodeResend(true);
      const result = await handleResendVerificationCode(email as string);
      console.log("RESULT", result);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message || "Something went wrong...");
    } finally {
      setCodeResend(false);
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
              <OTPInput
                length={6}
                value={verificationCode}
                onChange={(text) => setVerificationCode(text)}
                // error={"dfbdz"}
              />
              {/* <CustomTextInput
                value={verificationCode}
                onChangeText={(text) => setVerificationCode(text)}
                placeholder="Enter verification code"
                containerStyle="mb-4"
                keyboardType="numeric"
              /> */}
            </View>

            <View className="justify-center items-center flex-row mb-4">
              <TouchableOpacity
                className="mr-2"
                disabled={codeResend}
                onPress={() => handleResendCode()}
              >
                <Text className="ml-2 text-center text-[#3797EF] text-sm font-light">
                  Resend verification code?
                </Text>
              </TouchableOpacity>
              {codeResend && <ActivityIndicator size="small" />}
            </View>
            <View>
              {/* <CustomButton title="Register" onPress={() => handleRegister()} /> */}
              {/* <CustomButton title="Verify OTP" onPress={() => verifyOTP()} /> */}
              <CustomButton
                title="Verify OTP"
                loading={isLoading}
                onPress={() => handleVerify()}
              />
              {/* <CustomButton title="SignOut" onPress={() => handleLogin()} /> */}
            </View>
          </View>

          {/* <View className="justify-center items-center my-8 flex-row">
            <AntDesign name="facebook-square" size={24} color="#3797EF" />
            <Text className="ml-2 text-center text-base text-[#3797EF]">
              Log in with facebook
            </Text>
          </View> */}
          {/* <View className="items-center justify-between flex-row">
            <View className="w-[42%] items-center justify-center">
              <Divider dividerStyle="opacity-10" />
            </View>
            <View>
              <Text className="text-black items-center justify-center">OR</Text>
            </View>
            <View className="w-[42%] items-center justify-center">
              <Divider dividerStyle="opacity-10" />
            </View>
          </View> */}
          {/* <View className="justify-center items-center my-8 flex-row">
            <Text className="ml-2 text-center text-sm text-[#000000] text-opacity-0">
              Already have an account?{" "}
              <Text
                onPress={() => router.back()}
                className="text-sm text-blue-500"
              >
                Sign In.
              </Text>
            </Text>
          </View> */}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default VerificationScreen;
