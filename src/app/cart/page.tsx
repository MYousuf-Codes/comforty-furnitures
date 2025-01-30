"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";
import { addToWishlist } from "@/features/wishlist/wishlistSlice";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleAddToWishlist = (item: any) => {
    dispatch(addToWishlist(item));
  };

  return (
    <main>
      <div className="container mx-auto bg-white p-6 md:p-8 lg:px-24 lg:py-12 max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
          {/* Products Section */}
          <div className="w-full lg:w-3/5">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Your Cart</h1>
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center sm:justify-between p-5 bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg object-cover"
                      width={90}  // Reduced width for small screens
                      height={90} // Reduced height for small screens
                    />
                    <div>
                      <h1 className="font-semibold text-sm sm:text-lg">{item.name}</h1>
                      {/* Icon Container (Delete and Heart Icons) */}
                      <div className="flex gap-4 items-center mt-2 sm:mt-4">
                        <AiOutlineDelete
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                          size={20}  // Reduced size for small screens
                        />
                        <FaHeart
                          onClick={() => handleAddToWishlist(item)}
                          className="text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
                          size={20}  // Reduced size for small screens
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Price Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2">
                    <div className="flex items-center">
                      <h2 className="text-xs sm:text-sm font-semibold mr-2">Quantity</h2> {/* Added Quantity heading */}
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        inputProps={{ min: 1 }}
                        size="small"
                        className="w-12 sm:w-16 md:w-24"
                        variant="outlined"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold mt-1">MRP: ${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center items-center gap-6 bg-white shadow-md rounded-lg p-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Summary</h1>
            <div className="w-full space-y-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Sub Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <hr className="border-gray-200 opacity-40" />
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="border-gray-200 opacity-40" />
              <div className="flex justify-between text-lg sm:text-xl font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="bg-cyan-600 text-white hover:bg-cyan-700 text-sm sm:text-base font-semibold py-2 sm:py-3 mt-6 transition-all"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
