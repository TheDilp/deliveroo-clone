import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Dish } from "../types";
import { RootState } from "../store";

export interface BasketState {
  items: Dish[];
}
interface AddBasketAction {
  payload: Dish;
}
interface RemoveBasketAction {
  payload: {
    id: string;
  };
}
const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state: BasketState, action: AddBasketAction) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state: BasketState, action: RemoveBasketAction) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload.id
      );
      if (index !== -1) {
        let newBasket = [...state.items].splice(index, 1);
        state.items = newBasket;
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectBaskedItemsWithId = (state: RootState, id: string) =>
  state.basket.items.filter((item) => item._id === id);
export default basketSlice.reducer;
