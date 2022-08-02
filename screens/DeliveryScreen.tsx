import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XIcon } from "react-native-heroicons/solid";
import { Bar } from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { openURL } from "expo-linking";

export default function DeliveryScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-2xl font-bold">44-55 Minutes</Text>
            </View>
            <Image
              source={require("../assets/deliverygif2.gif")}
              className="w-20 h-20"
            />
          </View>

          <Bar
            className="mt-2"
            width={325}
            color="#00ccbb"
            indeterminate={true}
          />
          <Text className="mt-3 text-center text-xs text-gray-500">
            Your order at {restaurant?.name} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant?.lat || 0,
          longitude: restaurant?.long || 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 w-full z-0 -mt-10"
        mapType="mutedStandard"
      >
        <Marker
          title={restaurant?.name}
          coordinate={{
            latitude: restaurant?.lat || 0,
            longitude: restaurant?.long || 0,
          }}
          pinColor="#00ccbb"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-top space-x-6 h-28">
        <Image
          source={require("../assets/drivericon.jpeg")}
          className="w-12 h-12 bg-gray-300 p4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Mihailo Dilparić</Text>
          <Text className="text-gray-400 -mt-2">Your developer</Text>
        </View>
        <Text
          className="text-[#00ccbb] text-lg mr-5 font-bold"
          onPress={() =>
            openURL(
              "https://www.linkedin.com/in/mihailo-dilpari%C4%87-856a01241/"
            )
          }
        >
          Contact
        </Text>
      </SafeAreaView>
    </View>
  );
}
