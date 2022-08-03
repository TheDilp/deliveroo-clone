import React from "react";
import { Text, View } from "react-native";
import { Restaurant } from "../types";

export default function SearchListItem({ name }: Restaurant) {
  return (
    <View className="pl-5 py-2">
      <Text className="text-lg font-bold">{name}</Text>
    </View>
  );
}
