import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '@/redux/features/cart/cartSlice';
import ProductReducer from '@/redux/features/product/productSlice';
import UserReducer from '@/redux/features/user/userSlice';
import { api } from '@/redux/api/apiSlice';

const store = configureStore({
  reducer: {
    cart: CartReducer,
    product: ProductReducer,
    [api.reducerPath]: api.reducer,
    user: UserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
