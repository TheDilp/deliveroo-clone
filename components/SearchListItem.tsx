import React from "react";
import { Text, View } from "react-native";
import { Restaurant } from "../types";

export default function SearchListItem({ name }: Restaurant) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
