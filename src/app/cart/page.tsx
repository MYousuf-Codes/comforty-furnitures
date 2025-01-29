"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";
import { addToWishlist } from "@/features/wishlist/wishlistSlice"; // Wishlist action
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai"; // Delete icon
import { FaHeart } from "react-icons/fa"; // Heart icon

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
    dispatch(addToWishlist(item)); // Add to wishlist ONLY (no removal from cart)
  };

  return (
    <main>
      <div className="container mx-auto bg-whi p-4 md:p-8 lg:px-24 lg:py-12 max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
          {/* Products Section */}
          <div className="w-full lg:w-3/5">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Bags</h1>
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center sm:justify-between p-4 bg-white shadow rounded-lg"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg"
                      width={120}
                      height={120}
                    />
                    <div>
                      <h1 className="font-semibold text-lg sm:text-xl">{item.name}</h1>
                    </div>
                  </div>

                  {/* Icon Container (Delete and Heart Icons) */}
                  <div className="flex gap-4 items-center mt-4 sm:mt-0">
                    {/* Delete Icon (Removes from Cart) */}
                    <AiOutlineDelete
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      size={24}
                    />
                    {/* Heart Icon (Adds to Wishlist) */}
                    <FaHeart
                      onClick={() => handleAddToWishlist(item)}
                      className="text-gray-500 cursor-pointer hover:text-red-500"
                      size={24}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      inputProps={{ min: 1 }}
                      size="small"
                      className="w-20"
                    />
                    <span className="text-lg sm:text-xl font-semibold">MRP: ${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center items-center gap-6 bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Summary</h1>
            <div className="w-full space-y-4">
              <div className="flex justify-between text-base sm:text-lg">
                <span>Sub Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="w-full text-base sm:text-lg font-semibold py-3"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
