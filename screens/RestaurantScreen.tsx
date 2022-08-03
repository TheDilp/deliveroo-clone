import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Restaurant, RestaurantScreenNavProps } from "../types";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import Basket from "../components/Basket";
import { useSelector, useDispatch } from "react-redux";
import { selectBasketTotal } from "../features/basketSlice";
import { selectRestaurant, setRestaurant } from "../features/restaurantSlice";
import sanity from "../sanity";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const total = useSelector(selectBasketTotal);
  const restaurant = useSelector(selectRestaurant);
  const {
    params: { id },
  } =
    useRoute<
      RouteProp<{ Restaurant: RestaurantScreenNavProps }, "Restaurant">
    >();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanity
      .fetch(
        `
    *[_type == 'restaurant' && _id == $id] {
      _id,
        image,
        name,
        rating,
        type -> {
          _id,
          name
        },
        address,
        short_description,
        lat, 
        long,
        dishes[] -> {
          _id,
          name,
          short_description, 
          price,
          image
        }
    }[0]
    `,
        {
          id,
        }
      )
      .then((data) => dispatch(setRestaurant(data)));
  }, [dispatch]);

  if (!restaurant) return null;
  return (
    <>
      {total > 0 && <Basket />}
      <ScrollView className="">
        <View className="relative">
          <Image
            source={{
              uri: urlFor(restaurant?.image).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />

          <TouchableOpacity
            // @ts-ignore
            className="absolute top-14 left-5 bg-gray-100 rounded-full p-2"
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon color={"#00ccbb"} size={20} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{restaurant?.name}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{restaurant?.rating}</Text>{" "}
                  {restaurant?.type.name}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  {restaurant?.address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">
              {restaurant?.short_description}
            </Text>
          </View>

          {/* @ts-ignore */}
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 font-bold">Have a food allergy?</Text>
            <ChevronRightIcon color="#00ccbb" />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/* Dishrows */}

          {restaurant?.dishes.map((dish) => (
            <DishRow key={dish._id} {...dish} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
