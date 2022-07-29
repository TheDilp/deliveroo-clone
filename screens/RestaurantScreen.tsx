import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Restaurant, RestaurantScreenNavProps } from "../types";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  LocationMarkerIcon,
  StarIcon,
} from "react-native-heroicons/outline";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      lat,
      long,
    },
  } =
    useRoute<
      RouteProp<{ Restaurant: RestaurantScreenNavProps }, "Restaurant">
    >();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView className="">
      <View className="relative">
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="w-full h-56 bg-gray-300 p-4"
        />

        <TouchableOpacity
          // @ts-ignore
          className="absolute top-14 left-5 bg-gray-100 rounded-full p-2"
          onPress={navigation.goBack}
        >
          <ArrowLeftIcon color={"#00ccbb"} size={20} />
        </TouchableOpacity>
      </View>

      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            
            <View className="flex-row items-center space-x-1">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> {genre.name}
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-xs text-gray-500">{address}</Text>
            </View>
          
          </View>
          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
