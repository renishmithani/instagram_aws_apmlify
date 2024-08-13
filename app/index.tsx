import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import Divider from "@/components/Divider";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
// App.js

import { Amplify } from "aws-amplify";
import amplifyconfig from "../src/amplifyconfiguration.json";
import {
  handleSignIn,
  handleSignUp,
  handleSignUpConfirmation,
} from "@/awsUtils";
Amplify.configure(amplifyconfig);

const Index = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = useCallback(() => {
    // router.push("(tabs)");
    handleSignUp({
      username: "h123h@yopmail.com",
      password: "123456789",
      email: "h123h@yopmail.com",
    });
  }, []);

  const verifyOTP = useCallback(() => {
    handleSignUpConfirmation({
      username: "h123h@yopmail.com",
      confirmationCode: "800452",
    });
  }, []);

  const handleLogin = useCallback(() => {
    handleSignIn({
      username: "h123h@yopmail.com",
      password: "123456789",
    });
  }, []);

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
            <View>
              <CustomTextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Phone number, username, or email"
                containerStyle="mb-4"
              />
              <CustomTextInput
                value={pass}
                onChangeText={(text) => setPass(text)}
                placeholder="Password"
                containerStyle="mb-2"
                inputType="password"
              />
            </View>

            <View className="justify-end items-center flex-row mb-4">
              <TouchableOpacity onPress={() => router.push("forgotPass")}>
                <Text className="ml-2 text-center text-[#3797EF] text-sm font-light">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <CustomButton title="Register" onPress={() => handleRegister()} />
              <CustomButton title="Verify OTP" onPress={() => verifyOTP()} />
              <CustomButton title="Login" onPress={() => handleLogin()} />
              <CustomButton title="SignOut" onPress={() => handleLogin()} />
            </View>
          </View>

          <View className="justify-center items-center my-8 flex-row">
            <AntDesign name="facebook-square" size={24} color="#3797EF" />
            <Text className="ml-2 text-center text-base text-[#3797EF]">
              Log in with facebook
            </Text>
          </View>
          <View className="items-center justify-between flex-row">
            <View className="w-[42%] items-center justify-center">
              <Divider dividerStyle="opacity-10" />
            </View>
            <View>
              <Text className="text-black items-center justify-center">OR</Text>
            </View>
            <View className="w-[42%] items-center justify-center">
              <Divider dividerStyle="opacity-10" />
            </View>
          </View>
          <View className="justify-center items-center my-8 flex-row">
            <Text className="ml-2 text-center text-sm text-[#000000] text-opacity-0">
              Don't have an account?{" "}
              <Text
                onPress={() => router.push("signUp")}
                className="text-sm text-blue-500"
              >
                Sign up.
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default Index;
