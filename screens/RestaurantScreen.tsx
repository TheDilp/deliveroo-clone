import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Restaurant, RestaurantScreenNavProps } from "../types";
import { urlFor } from "../sanity";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

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
    </ScrollView>
  );
}
