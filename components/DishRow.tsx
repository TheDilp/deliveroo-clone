import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Dish } from "../types";
import NumberFormat from "react-number-format";
export default function DishRow({
  _id,
  name,
  price,
  short_description,
  image,
}: Dish) {
  return (
    <TouchableOpacity>
      <View>
        <Text className="text-lg mb-1">{name}</Text>
        <Text className="text-gray-400">{short_description}</Text>
        <NumberFormat
          value={price}
          displayType="text"
          thousandSeparator={true}
          renderText={(value) => <Text>{value}</Text>}
          prefix={"£"}
        />
      </View>
    </TouchableOpacity>
  );
}
