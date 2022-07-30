import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Dish, Restaurant } from "../types";

export interface RestaurantState {
  restaurant: Restaurant | null;
}
interface SetRestaurantAction {
  payload: Restaurant;
}

const initialState: RestaurantState = {
  restaurant: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state: RestaurantState, action: SetRestaurantAction) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;
export const selectRestaurant = (state: RootState) =>
  state.restaurant.restaurant;
export default restaurantSlice.reducer;
