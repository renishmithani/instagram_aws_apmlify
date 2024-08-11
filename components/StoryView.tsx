import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import Divider from "./Divider";
import { LinearGradient } from "expo-linear-gradient";

interface StoryView {
  data: any;
}

interface StoryViewRenderItem {
  item: any;
  index: number;
}

const StoryViewRenderItem = ({ item, index }: StoryViewRenderItem) => {
  const {} = item;
  const colors = [
    ["#FF6B6B", "#F7C59F", "#F28C28"],
    ["#0093E9", "#80D0C7", "#5E60CE"],
    ["#006400", "#228B22", "#32CD32"],
    ["#6A0572", "#A4508B", "#C06C84"],
    ["#FF7E5F", "#FEB47B", "#FFD54F"],
    ["#FF9966", "#FF5E62", "#FFC371"],
    ["#1A2980", "#26D0CE", "#6DD5FA"],
    ["#FF4E50", "#FC913A", "#FF6B6B"],
    ["#A8E6CF", "#DCEDC1", "#FFD3B6"],
    ["#403B4A", "#E8E8E8", "#3C3B3F"],
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
            height: 68,
            width: 68,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 82 / 2,
          }}
        >
          <Image
            source={{ uri: item?.picture?.medium }}
            className="h-[60px] w-[60px] rounded-full"
            resizeMode="contain"
          />
        </LinearGradient>
      </View>
      <Text className="text-xs">{`${item?.name?.first}`}</Text>
    </View>
  );
};

const StoryView = ({ data }: StoryView) => {
  return (
    <>
      <View className="h-[90px] my-2">
        <FlatList
          horizontal
          data={data}
          keyExtractor={({ item }) => item?.id?.value}
          renderItem={({ item, index }) => {
            return <StoryViewRenderItem item={item} index={index} />;
          }}
          showsHorizontalScrollIndicator={false}
        />
        <Divider dividerStyle="opacity-20" />
      </View>
    </>
  );
};

export default StoryView;
