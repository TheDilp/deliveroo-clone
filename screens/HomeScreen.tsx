import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanity from "../sanity";
import { Featured, Restaurant } from "../types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllRestaurants,
  setAllRestaurants,
} from "../features/restaurantSlice";
import SearchListItem from "../components/SearchListItem";
export default function HomeScreen() {
  const navigation = useNavigation();
  const [featured, setFeatured] = useState<Featured[]>([]);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const restaurants = useSelector(selectAllRestaurants);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanity
      .fetch(
        `
  *[_type == 'restaurant'] {
    _id,
    image,
    name,
    rating,
    type -> {
    _id,
    name
        },
  }
  `
      )
      .then((data) => dispatch(setAllRestaurants(data)));
  }, []);

  useEffect(() => {
    sanity
      .fetch(
        `
    *[_type == 'featured'] {
      _id,
      name,
    short_description
    }
    `
      )
      .then((data) => setFeatured(data));
  }, []);

  return (
    <SafeAreaView
      className="bg-white "
      style={{
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {/* Header */}

      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={require("../assets/drivericon.jpeg")}
          className="w-7 h-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location <ChevronDownIcon size={20} color="#00ccbb" />
          </Text>
        </View>
        <UserIcon size={35} color="#00ccbb" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row items-center flex-1 space-x-2 bg-gray-200 p-3 mr-4">
          <SearchIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
          <FlatList
            data={restaurants}
            renderItem={({ item }) => <SearchListItem {...item} />}
          />
        </View>
        <AdjustmentsIcon color="#00ccbb" />
      </View>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured Rows */}
        {featured.map((featured) => (
          <FeaturedRow
            key={featured._id}
            id={featured._id}
            title={featured.name}
            description={featured.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
