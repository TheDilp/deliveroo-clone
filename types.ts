export type Restaurant = {
  _id: string;
  name: string;
  short_description: string;
  image: string;
  lat: number;
  long: number;
  address: string;
  rating: number;
  type: string;
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
