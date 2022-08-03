import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { LocationMarkerIcon, StarIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { Category, Dish, Restaurant } from "../types";

const RestaurantCard = ({
  _id: id,
  image,
  name,
  rating,
  type,
  address,
}: Pick<
  Restaurant,
  "_id" | "image" | "name" | "address" | "type" | "rating"
>) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      // @ts-ignore
      className="bg-white mr-3 shadow w-64"
      delayPressIn={100}
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
        });
      }}
    >
      <Image
        className="w-full h-64 rounded-sm object-cover"
        source={{
          uri: urlFor(image).url(),
        }}
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{name}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text>·{type.name}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
