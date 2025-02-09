"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromWishlist } from "@/features/wishlist/wishlistSlice";
import Image from "next/image";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Wishlist() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id: string, item: any) => {
    dispatch(removeFromWishlist(id));
    toast.success(`${item.name} removed from your wishlist!`, {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <main>
      <div className="container mx-auto min-h-screen bg-whi p-4 md:p-8 lg:px-24 lg:py-12 max-w-screen-2xl">
        <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-left">Wishlist</h1>
            {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <p className="text-lg md:text-xl mb-4">Your wishlist is empty.</p>
              <Link href="/products">
              <Button variant="contained" color="primary">
                Browse Products Now
              </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {wishlistItems.map((item) => (
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
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg sm:text-xl font-semibold">MRP: ${item.price}</span>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRemoveFromWishlist(item.id, item)}
                  >
                    Remove from Wishlist
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
