import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "@/features/cart/cartSlice";
import wishlistReducer, { WishlistState } from "@/features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

// Corrected: Avoid duplicate declaration of RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
