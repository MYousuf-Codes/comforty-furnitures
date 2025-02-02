// /src/app/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";  // Adjusted import path for cart
import wishlistReducer from "@/features/wishlist/wishlistSlice";  // Adjusted import path for wishlist

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

// Correct type declarations
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
