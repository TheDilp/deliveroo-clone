import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

type Props = {
  imgUrl: string;
  title: string;
};

const CategoryCard = ({ imgUrl, title }: Props) => {
  return (
    // @ts-ignore
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="w-28 h-28 rounded"
      />
      <Text className="absolute w-full text-center bottom-1 shadow-lg text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
