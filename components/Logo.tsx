import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";

const Logo = () => {
  return (
    <Image
      className="h-[50px] w-[120px]"
      source={require("../assets/images/instagramLogo.png")}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({});

export default Logo;
