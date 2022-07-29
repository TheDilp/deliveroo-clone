import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Dish } from "../types";
import NumberFormat from "react-number-format";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
export default function DishRow({
  _id,
  name,
  price,
  short_description,
  image,
}: Dish) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <>
      {/* @ts-ignore */}
      <TouchableOpacity
        className="bg-white border border-gray-200 p-4"
        onPress={() => setIsPressed(!isPressed)}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
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
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View>
          <View>
            <TouchableOpacity>
              <MinusCircleIcon color={"gray"} size={40} />
            </TouchableOpacity>
            <Text>0</Text>
            <TouchableOpacity>
              <PlusCircleIcon size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
