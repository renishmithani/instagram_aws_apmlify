import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Divider from "./Divider";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface StoryView {
  data: any;
}

interface StoryViewRenderItem {
  item: any;
  index: number;
}

const AddStoryComponent = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-col items-center justify-center ml-3"
    >
      <View className="rounded-full items-center justify-center border-2 border-gray-300">
        <View className="border-2 h-[65px] w-[65px] rounded-full border-1 justify-center align-center items-center border-white bg-white">
          <FontAwesome name="user" size={50} color="gray" />
          <View className="absolute right-[-2] bottom-[-2]">
            <FontAwesome5 name="plus" size={15} color="black" />
          </View>
        </View>
      </View>
      <Text className="text-xs">Add story</Text>
    </TouchableOpacity>
  );
};

const StoryViewRenderItem = ({ item, index }: StoryViewRenderItem) => {
  const {} = item;
  const colors = [
    // ["#FF6B6B", "#F7C59F", "#F28C28"],
    // ["#0093E9", "#80D0C7", "#5E60CE"],
    // ["#006400", "#228B22", "#32CD32"],
    // ["#6A0572", "#A4508B", "#C06C84"],
    // ["#FF7E5F", "#FEB47B", "#FFD54F"],
    // ["#FF9966", "#FF5E62", "#FFC371"],
    // ["#1A2980", "#26D0CE", "#6DD5FA"],
    ["#FF4E50", "#FC913A", "#FF6B6B"],
    // ["#A8E6CF", "#DCEDC1", "#FFD3B6"],
    // ["#403B4A", "#E8E8E8", "#3C3B3F"],
  ];

  function getRandomColorArray() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  return (
    <View className="flex-col items-center justify-center ml-3">
      <View className="rounded-full items-center justify-center">
        <LinearGradient
          colors={getRandomColorArray()}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{
            height: 69,
            width: 69,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 82 / 2,
          }}
        >
          <View className="border-2 h-[65px] w-[65px] rounded-full border-white bg-white">
            <Image
              source={{ uri: item?.picture?.medium }}
              className="h-[60px] w-[60px] rounded-full"
              resizeMode="contain"
            />
          </View>
        </LinearGradient>
      </View>
      <Text className="text-xs">{`${item?.name?.first}`}</Text>
    </View>
  );
};

const StoryView = ({ data }: StoryView) => {
  return (
    <>
      <View className="h-[110px] bg-white border-b-2 border-gray-200">
        <FlatList
          horizontal
          data={data}
          keyExtractor={({ item }) => item?.id?.value}
          renderItem={({ item, index }) => {
            return index == 0 ? (
              <AddStoryComponent onPress={null} />
            ) : (
              <StoryViewRenderItem item={item} index={index} />
            );
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default StoryView;
