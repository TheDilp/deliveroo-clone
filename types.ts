import { NavigatorScreenParams } from "@react-navigation/native";

export type Restaurant = {
  _id: string;
  name: string;
  short_description: string;
  image: string;
  lat: number;
  long: number;
  address: string;
  rating: number;
  type: Category;
  dishes: Dish[];
};

export type Dish = {
  _id: string;
  name: string;
  short_description: string;
  price: number;
  image: string;
};

export type Category = {
  _id: string;
  name: string;
  image: string;
};

export type Featured = {
  _id: string;
  name: string;
  short_description: string;
  restuarants: Restaurant[];
};

export type RestaurantScreenNavProps = {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  genre: Category;
  address: string;
  short_description: string;
  dishes: Dish[];
  lat: number;
  long: number;
};

export type RootStackParamList = {
  Home: undefined;
  Restaurant: RestaurantScreenNavProps;
  Basket: any;
  PreparingOrder: any;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
