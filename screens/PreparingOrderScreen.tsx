import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { Circle } from "react-native-progress";
export default function PreparingOrderScreen() {
  return (
    <SafeAreaView className="bg-[#00ccbb] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/deliverygif.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="w-96 h-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
}
