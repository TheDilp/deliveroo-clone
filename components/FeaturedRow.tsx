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
        type,
        address,
        short_description,
        lat, long,
        dishes[] -> {
          _id,
          name,
          short_description, 
          price
        }
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
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            lat={restaurant.lat}
            long={restaurant.long}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
