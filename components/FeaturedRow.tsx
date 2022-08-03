import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanity from "../sanity";
import { Restaurant } from "../types";
type Props = {
  id: string;
  title: string;
  description: string;
};
const FeaturedRow = ({ id, title, description }: Props) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    sanity
      .fetch(
        `
    *[_type == "featured" && _id == $id] {
      _id,
      name,
      restaurants[] -> {
        _id,
        image,
        name,
        rating,
        type -> {
          _id,
          name
        },
        address,
      }
    }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants || []);
      });
  }, [id]);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            _id={restaurant._id}
            name={restaurant.name}
            type={restaurant.type}
            address={restaurant.address}
            image={restaurant.image}
            rating={restaurant.rating}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
