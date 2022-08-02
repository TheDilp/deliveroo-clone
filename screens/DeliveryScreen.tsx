import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XIcon } from "react-native-heroicons/solid";
import { Bar } from "react-native-progress";
import MapView from "react-native-maps";

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
        </View>
      </SafeAreaView>
      <View>
        <MapView
          initialRegion={{
            latitude: restaurant?.lat || 0,
            longitude: restaurant?.long || 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          className="flex-1 w-full h-full z-0 -mt-10"
          mapType="mutedStandard"
        ></MapView>
      </View>
    </View>
  );
}
