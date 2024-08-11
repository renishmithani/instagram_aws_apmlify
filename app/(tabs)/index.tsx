import CustomHeader from "@/components/CustomHeader";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import StoryView from "@/components/StoryView";

const PostComponent = ({ item, index }) => {
  const {} = item;
  return (
    <View className="h-auto mb-3">
      <View className="flex-row mx-3 my-2">
        <View className="items-center justify-center">
          <View className="rounded-full">
            <Image
              className="h-[50px] w-[50px] rounded-full"
              source={{
                uri: "https://randomuser.me/api/portraits/med/men/20.jpg",
              }}
            />
          </View>
        </View>
        <View className="items-center justify-center ml-2">
          <Text>Name</Text>
          <Text>India</Text>
        </View>
      </View>
      <View className="w-full">
        <Image
          className="w-full h-[300px]"
          resizeMode="cover"
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1661873673782-88b30e6abef4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
      </View>
      <View></View>
    </View>
  );
};

const Index = () => {
  const [storyData, setStoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const generateUserData = async ({
    refresh = false,
  }: {
    refresh?: boolean;
  }): Promise<void> => {
    setRefreshing(refresh);
    try {
      await fetch("https://randomuser.me/api/?results=50")
        .then((res) => res.json())
        .then((data) => {
          setStoryData(data.results);
        });
    } catch (err) {
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    generateUserData({});
  }, []);

  return (
    <View>
      <CustomHeader
        headerLeft={
          <TouchableOpacity onPress={() => null}>
            <Feather name="camera" size={24} color="black" />
          </TouchableOpacity>
        }
        headerRight={
          <View className="flex-row">
            <TouchableOpacity onPress={() => null}>
              <Feather
                name="tv"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => null}>
              <Feather name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => generateUserData({ refresh: true })}
            refreshing={refreshing}
          />
        }
      >
        <StoryView data={storyData || []} />
        <FlatList
          data={new Array(10).fill(1)}
          renderItem={({ item, index }) => {
            return <PostComponent item={item} index={index} />;
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Index;
