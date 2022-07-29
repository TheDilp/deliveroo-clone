import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Dish } from "../types";
import NumberFormat from "react-number-format";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBaskedItemsWithId,
} from "../features/basketSlice";
import { RootState } from "../store";
export default function DishRow({
  _id,
  name,
  price,
  short_description,
  image,
}: Dish) {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) =>
    selectBaskedItemsWithId(state, _id)
  );
  function addItemToBasket() {
    dispatch(addToBasket({ _id, name, short_description, image, price }));
  }
  function removeItemFromBasket() {
    if (!(items.length > 0)) return;
    dispatch(removeFromBasket({ id: _id }));
  }
  return (
    <>
      <TouchableOpacity
        //   @ts-ignore
        className={`bg-white border border-gray-200 p-4 ${
          isPressed && "border-b-0"
        }`}
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
              renderText={(value) => (
                <Text className="text-gray-500 text-sm mt-2">{value}</Text>
              )}
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
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-3 pb-3">
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <MinusCircleIcon
                color={items.length > 0 ? "#00ccbb" : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color="#00ccbb" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
