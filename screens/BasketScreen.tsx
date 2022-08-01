import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { Dish } from "../types";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import NumberFormat from "react-number-format";
export default function BasketScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
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
      else {
        // Else create key and set count to 1
        temp[current._id] = { ...current, count: 1 };
      }

      return temp;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  //   Show nowthing if there are no items
  if (items.length === 0) {
    navigation.goBack();
    return null;
  }

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
        <View className="flex-row items-center space-x-5 my-5 px-4 py-3 bg-white">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75mins</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        {/* List of added items */}
        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, value]) => (
            <View
              key={key}
              className="flex-row items-center space-x-4 bg-white py-2 px-4"
            >
              <Text className="pr-2">{value.count} x</Text>
              <Image
                source={{
                  uri: urlFor(value.image).url(),
                }}
                className="w-12 h-12 rounded-full"
              />
              <Text className="flex-1 text-sm">{value.name}</Text>
              <NumberFormat
                value={value.price}
                displayType="text"
                thousandSeparator={true}
                renderText={(value) => (
                  <Text className="text-gray-600 pr-2">{value}</Text>
                )}
                prefix={"£"}
              />
              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="text-gray-400 flex-row justify-between">
            <Text className="text-gray-400">Subtotal:</Text>
            <Text className="text-gray-400">
              <NumberFormat
                value={total}
                displayType="text"
                thousandSeparator={true}
                renderText={(value) => (
                  <Text className="text-gray-400">{value}</Text>
                )}
                prefix={"£"}
              />
            </Text>
          </View>
          <View className="text-gray-400 flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee:</Text>
            <Text className="text-gray-400">£5.99</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total:</Text>
            <Text className="font-extrabold">£5.99</Text>
          </View>

          {/* @ts-ignore */}
          <TouchableOpacity className="rounded-lg bg-[#00ccbb] p-4">
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
