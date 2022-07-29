import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import NumberFormat from "react-number-format";
const Basket = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();
  return (
    <View className="absolute bottom-10 w-full z-50">
      {/* @ts-ignore */}
      <TouchableOpacity className="bg-[#00ccbb] mx-5 p-4 rounded-lg flex-row items-center space-x-1">
        <Text className="text-white font-extrabold text-lg bg-[#01a296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <NumberFormat
          value={basketTotal}
          displayType="text"
          thousandSeparator={true}
          renderText={(value) => (
            <Text className="text-white text-lg text-extrabold">{value}</Text>
          )}
          prefix={"£"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Basket;
