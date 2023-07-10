import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@/types/globalTypes.ts';

interface ICart {
  products: IProduct[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id,
      );
      if (existingProduct && existingProduct.quantity) {
        existingProduct.quantity += 1;
      } else state.products.push({ ...action.payload, quantity: 1 });

      state.total += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id,
      );
      state.total -= action.payload.price * action.payload.quantity!; //non nullable assertion "!"
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id,
      );
      if (
        existingProduct &&
        existingProduct.quantity &&
        existingProduct.quantity > 1
      ) {
        existingProduct.quantity -= 1;
      } else
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id,
        );
      state.total -= action.payload.price;
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
