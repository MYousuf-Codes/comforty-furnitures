"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";
import { addToWishlist } from "@/features/wishlist/wishlistSlice";
import Image from "next/image";
import { TextField } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
      toast.info(`Quantity of item ${name} updated to ${quantity}`);
    }
  };

  const handleRemoveItem = (name: string) => {
    dispatch(removeFromCart(name));
    toast.error(`Item with id ${name} removed from the cart`);
  };

  const handleAddToWishlist = (item: any) => {
    dispatch(addToWishlist(item));
    toast.success(`${item.name} added to your wishlist!`, {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClick: () => router.push("/wishlist"),
    });
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceedToCheckout = async () => {
    setIsProcessing(true);
    try {
      await router.push("/checkout");
    } finally {
      setIsProcessing(false); // If navigation is fast, reset immediately
    }
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
                  key={item.name}
                  className="flex flex-col sm:flex-row items-center sm:justify-between p-5 bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg object-cover"
                      width={90}
                      height={90}
                    />
                    <div>
                      <h1 className="font-semibold text-sm sm:text-lg">{item.name}</h1>
                      {/* Icon Container (Delete and Heart Icons) */}
                      <div className="flex gap-4 items-center mt-2 sm:mt-4">
                        <AiOutlineDelete
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                          size={20}
                        />
                        <FaHeart
                          onClick={() => handleAddToWishlist(item)}
                          className="text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Price Section */}
                  <div className="flex flex-col sm:flex-row items-center sm:gap-4 mt-2 w-full lg:w-1/2 lg:items-end">
                    {/* Quantity and Price on Desktop */}
                    <div className="w-full flex flex-col sm:flex-row items-center justify-end gap-2 lg:gap-4">
                      {/* Quantity Section */}
                      <div className="flex items-center justify-between w-full sm:w-1/2">
                        <h2 className="text-xs sm:text-sm font-semibold mr-2">Quantity</h2>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          inputProps={{ min: 1 }}
                          size="small"
                          className="w-full sm:w-24 md:w-28 lg:w-32"
                          variant="outlined"
                        />
                      </div>

                      {/* Price Section */}
                      <span className="text-xs sm:text-sm font-semibold mt-1 sm:mt-0 w-full sm:w-1/2 text-right">
                        MRP: ${item.price}
                      </span>
                    </div>
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
            <button
              type="submit"
              onClick={handleProceedToCheckout}
              className={`w-full py-3 rounded-md transition ${isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                } text-white`}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}