import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { Restaurant } from "../types";

export default function SearchListItem({ _id, name }: Restaurant) {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      className="pl-5 py-2"
      onPress={() => navigate.navigate("Restaurant", { id: _id })}
      
    >
      <Text className="text-lg font-bold">{name}</Text>
    </TouchableOpacity>
  );
}
