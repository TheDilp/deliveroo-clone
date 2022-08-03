import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { urlFor } from "../sanity";
import { Restaurant } from "../types";

export default function SearchListItem({ _id, name, image }: Restaurant) {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      className="pl-5 py-2 flex-row space-x-4"
      onPress={() => navigate.navigate("Restaurant", { id: _id })}
    >
      <Image
        className="w-10 h-10 rounded-full"
        source={{
          uri: urlFor(image).url(),
        }}
      />
      <Text className="text-lg font-bold flex-1">{name}</Text>
    </TouchableOpacity>
  );
}
