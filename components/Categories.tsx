import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanity, { urlFor } from "../sanity";
import category from "../sanity/schemas/category";
import { Category } from "../types";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    sanity
      .fetch(
        `
    *[_type == "category"] {
      _id, 
      name,
      image
    }`
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          title={category.name}
          imgUrl={urlFor(category.image).width(200).url()}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
