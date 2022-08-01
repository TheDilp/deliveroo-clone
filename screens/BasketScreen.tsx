import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { selectBasketItems } from "../features/basketSlice";
import { Dish } from "../types";
import { XCircleIcon } from "react-native-heroicons/outline";
export default function BasketScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState<{
    [key: string]: Dish & { count: number };
  }>({});

  useEffect(() => {
    const groupedItems = items.reduce<{
      [key: string]: Dish & { count: number };
    }>((prevValue, current) => {
      let temp = prevValue;

      //   If item already exists increase count
      if (temp[current._id])
        temp[current._id] = {
          ...temp[current._id],
          count: temp[current._id].count + 1,
        };

      // Else create key and set count to 1
      temp[current._id] = { ...current, count: 1 };

      return temp;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  //   Show nowthing if there are no items
  if (items.length === 0) return null;

  return (
    <SafeAreaView className="flex-1 bg-white mt-10">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant?.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            // @ts-ignore
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00ccbb" width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
