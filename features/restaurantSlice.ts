import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Restaurant } from "../types";

export interface RestaurantState {
  allRestaurants: Restaurant[];
  restaurant: Restaurant | null;
}
interface SetRestaurantAction {
  payload: Restaurant;
}
interface SetAllRestaurantsAction {
  payload: Restaurant[];
}

const initialState: RestaurantState = {
  allRestaurants: [],
  restaurant: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setAllRestaurants: (
      state: RestaurantState,
      action: SetAllRestaurantsAction
    ) => {
      state.allRestaurants = action.payload;
    },
    setRestaurant: (state: RestaurantState, action: SetRestaurantAction) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setAllRestaurants, setRestaurant } = restaurantSlice.actions;
export const selectRestaurant = (state: RootState) =>
  state.restaurant.restaurant;

export const selectAllRestaurants = (state: RootState) =>
  state.restaurant.allRestaurants;

export default restaurantSlice.reducer;
