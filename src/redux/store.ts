import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './feature/cart/cartSlice';
import productReducer from './feature/product/productSlice';
import { api } from './api/apiSlice';
import userReducer from './feature/user/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
