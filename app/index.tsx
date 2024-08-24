import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Amplify } from "aws-amplify";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import Divider from "@/components/Divider";
import AntDesign from "@expo/vector-icons/AntDesign";
import { currentAuthenticatedUser, handleSignIn } from "@/awsUtils";

import amplifyconfig from "../src/amplifyconfiguration.json";

Amplify.configure(amplifyconfig);

const Index = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isChecking, setIsChecking] = useState(true);

  const checkUserLogin = async () => {
    try {
      setIsChecking(true);
      const result = await currentAuthenticatedUser();
      console.log("RESULT", result);
      if (result?.userId) {
        router.push({ pathname: "/(tabs)" });
      }
    } catch (error) {
    } finally {
      setIsChecking(false);
    }
  };

  const handleLogin = async () => {
    const result = await handleSignIn({
      username: email,
      password: pass,
    });

    if (result?.isSignedIn) {
      router.push({ pathname: "/(tabs)" });
    }
    console.log("RESULT", result);
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  if (isChecking) {
    return (
      <View className="flex-1 align-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

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
              <CustomButton title="Login" onPress={() => handleLogin()} />
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
