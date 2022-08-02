import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Dish } from "../types";

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
        let newBasket = [...state.items];
        newBasket.splice(index, 1);
        state.items = newBasket;
      }
    },

    clearBasket: (state: BasketState) => ({ ...initialState }),
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;

// Select all items

export const selectBasketItems = (state: RootState) => state.basket.items;

// Select all items with an id

export const selectBaskedItemsWithId = (state: RootState, id: string) =>
  state.basket.items.filter((item) => item._id === id);

//   Go through basket -> reduce to one price
export const selectBasketTotal = (state: RootState) =>
  state.basket.items.reduce(
    (total: number, item: Dish) => parseFloat((total += item.price).toFixed(2)),
    0
  );
export default basketSlice.reducer;
