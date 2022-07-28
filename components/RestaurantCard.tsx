import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { LocationMarkerIcon, StarIcon } from "react-native-heroicons/outline";
import { Dish } from "../types";
import { urlFor } from "../sanity";

type Props = {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
  short_description: string;
  dishes: Dish[];
  long: number;
  lat: number;
};

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}: Props) => {
  return (
    // @ts-ignore
    <TouchableOpacity className="bg-white mr-3 shadow w-64" delayPressIn={150}>
      <Image
        className="w-full h-64 rounded-sm object-cover"
        source={{
          uri: urlFor(imgUrl).url(),
        }}
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text>·
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
