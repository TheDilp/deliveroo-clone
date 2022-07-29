import { View, Text } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Restaurant, RestaurantScreenNavProps } from "../types";

export default function RestaurantScreen() {
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
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
