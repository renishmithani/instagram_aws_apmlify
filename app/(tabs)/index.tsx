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
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const PostComponent = ({ item, index }) => {
  const { name, profile, post, location } = item;
  return (
    <View className="h-auto">
      <View className="flex-row mx-3 my-1">
        <View className="items-center justify-center">
          <View className="rounded-full">
            <Image
              className="h-[50px] w-[50px] rounded-full"
              source={{
                uri: profile,
              }}
            />
          </View>
        </View>
        <View className="ml-2 justify-center">
          <Text>{name}</Text>
          <Text>{location}</Text>
        </View>
      </View>
      <View className="w-full">
        <Image
          className="w-full h-[300px]"
          resizeMode="cover"
          source={{
            uri: post,
          }}
        />
      </View>
      <View className="mx-3 h-[50px] flex-row justify-between">
        <View className="flex-row items-center gap-2">
          <View className="flex-row">
            <AntDesign name="hearto" size={24} color="black" />
            <Text className="ml-1">5.5k</Text>
          </View>
          <View className="flex-row">
            <FontAwesome6 name="comment" size={24} color="black" />
            <Text className="ml-1">5.5k</Text>
          </View>
          <View>
            <Feather name="send" size={24} color="black" />
          </View>
        </View>
        <View className="flex-row items-center">
          <FontAwesome6 name="bookmark" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

const Index = () => {
  const [storyData, setStoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const postData = [
    {
      name: "Cristiano Ronaldo",
      profile:
        "https://content.api.news/v3/images/bin/53e7c101935242a67a6a243ac53395c2",
      post: "https://cdn.britannica.com/53/251253-050-92856127/Christiano-Ronaldo-Al-Nassr-Club-Saudi-Pro-League-2023.jpg",
      location: "Portuguese",
    },
    {
      name: "Lionel Messi",
      profile:
        "https://sportsmatik.com/uploads/world-events/players/lionel-messi_1564492648.jpg",
      post: "https://tmssl.akamaized.net/images/foto/galerie/lionel-messi-1401789362-224.jpg?lm=1483605491",
      location: "Rosario, Argentina",
    },
    {
      name: "Lionel Messi",
      profile:
        "https://sportsmatik.com/uploads/world-events/players/lionel-messi_1564492648.jpg",
      post: "https://i.eurosport.com/2023/01/19/3530526-71957695-1600-900.jpg",
      location: "Rosario, Argentina",
    },
    {
      name: "Lionel Messi",
      profile:
        "https://sportsmatik.com/uploads/world-events/players/lionel-messi_1564492648.jpg",
      post: "https://hollywoodlife.com/wp-content/uploads/2016/02/lionel-messi-bio-photo.jpg?quality=100",
      location: "Rosario, Argentina",
    },
    {
      name: "Trump USA",
      profile:
        "https://static.toiimg.com/thumb/msid-78949145,width-400,resizemode-4/78949145.jpg",
      post: "https://www.whitehouse.gov/wp-content/uploads/2021/01/about_the_white_house.jpg",
      location: "USA",
    },
    {
      name: "Trump USA",
      profile:
        "https://static.toiimg.com/thumb/msid-78949145,width-400,resizemode-4/78949145.jpg",
      post: "https://www.nps.gov/common/uploads/cropped_image/primary/F0CEDDA8-CDA3-A365-792FF3B0EB0FCFF8.jpg?width=1600&quality=90&mode=crop",
      location: "USA",
    },
    {
      name: "Trump USA",
      profile:
        "https://static.toiimg.com/thumb/msid-78949145,width-400,resizemode-4/78949145.jpg",
      post: "https://bsmedia.business-standard.com/_media/bs/img/article/2024-06/24/full/1719212935-6547.jpg?im=FeatureCrop,size=(826,465)",
      location: "USA",
    },
    {
      name: "Trump USA",
      profile:
        "https://static.toiimg.com/thumb/msid-78949145,width-400,resizemode-4/78949145.jpg",
      post: "https://www.visapasspo.com/wp-content/uploads/2023/03/uss.jpg",
      location: "USA",
    },
  ];

  const generateUserData = async ({
    refresh = false,
  }: {
    refresh?: boolean;
  }): Promise<void> => {
    setRefreshing(refresh);
    try {
      await fetch("https://randomuser.me/api/?results=10")
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
      <FlatList
        className="bg-white"
        data={[]}
        renderItem={null}
        ListFooterComponent={
          <FlatList
            data={postData || []}
            renderItem={({ item, index }) => {
              return <PostComponent item={item} index={index} />;
            }}
          />
        }
        ListHeaderComponent={<StoryView data={storyData || []} />}
        refreshControl={
          <RefreshControl
            onRefresh={() => generateUserData({ refresh: true })}
            refreshing={refreshing}
          />
        }
      />
    </View>
  );
};

export default Index;
