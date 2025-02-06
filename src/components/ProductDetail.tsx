"use client"; // Client-side component for React hooks

import { urlFor } from "@/sanity/lib/image"; 
import Image from "next/image"; 
import { useDispatch } from "react-redux"; 
import { addToCart } from "@/features/cart/cartSlice"; 
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci"; 
import { toast } from "react-toastify"; 
import { useRouter } from "next/navigation";

interface ProductProps {
  product: {
    _id: string;
    title: string;
    price: number;
    priceWithoutDiscount?: number;
    image: any;
    description: string;
    inventory: number;
  };
}

const ProductDetail = ({ product }: ProductProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // State to manage quantity of the product
  const [quantity, setQuantity] = useState(1);

  // Handle add to cart action
  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.title,
      image: urlFor(product.image).url(),
      price: product.price,
      quantity: quantity,
    };
    dispatch(addToCart(cartItem));

    toast.success(`${product.title} has been added to the cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClick: () => router.push("/cart"),
    });
  };

  // Increase quantity
  const increaseQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-6 py-10 bg-white">
      {/* Left: Product Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <Image
          src={urlFor(product.image).url()}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-none object-contain"
        />
      </div>

      {/* Right: Product Details */}
      <div className="w-full md:w-1/2 max-w-md">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          {product.title}
        </h1>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-semibold text-white bg-cyan-600 rounded-full py-1 px-3">
            ${product.price} USD
          </span>
          {product.priceWithoutDiscount && (
            <span className="text-md text-gray-500 line-through ml-3">
              ${product.priceWithoutDiscount}
            </span>
          )}
        </div>

        <hr className="border-gray-300 my-4" />

        <p className="text-gray-700 text-sm mb-6">{product.description}</p>

        <p className={`text-base mb-6 font-semibold ${product.inventory === 0 ? "text-red-600" : product.inventory < 5 ? "text-red-600" : "text-green-600"}`}>
          {product.inventory === 0 ? "Out of Stock" : `In stock: ${product.inventory}`}
        </p>

        {/* Quantity Section */}
        <div className="flex items-center gap-4 mb-6">
          <p className="text-gray-700 text-lg font-semibold">Quantity:</p>

          {/* Decrement Button */}
          <button
            onClick={decreaseQuantity}
            disabled={quantity === 1} // Disable minus button if quantity is 1
            className={`${quantity === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700"
              } text-white text-lg px-4 py-2 rounded-3xl`}
          >
            -
          </button>
          {/* Display Quantity */}
          <span className="text-gray-700 text-lg font-semibold">{quantity}</span>
          {/* Increment Button */}
          <button
            onClick={increaseQuantity}
            className="bg-cyan-600 text-white text-lg px-4 py-2 rounded-3xl hover:bg-cyan-700"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex items-center bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 transition-all"
        >
          <CiShoppingCart className="text-white text-2xl mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
