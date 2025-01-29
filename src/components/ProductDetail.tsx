"use client"; // Client-side component for React hooks

import { urlFor } from "@/sanity/lib/image";  // Ensure correct image URL generation
import Image from "next/image";  // Next.js Image component
import { useDispatch } from "react-redux";  // Redux for managing the cart
import { addToCart } from "@/features/cart/cartSlice";  // Action for adding to cart
import { useState } from "react";  // React state for managing quantity
import { CiShoppingCart } from "react-icons/ci";  // Shopping cart icon

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
    <div className="flex flex-col md:flex-row bg-white items-center justify-center gap-10 px-6 py-10">
      {/* Left: Product Image */}
      <div className="flex justify-center items-start">
        <Image
          src={urlFor(product.image).url()}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg object-contain"
        />
      </div>

      {/* Right: Product Details */}
      <div className="max-w-md">
        <h1 className="text-4xl -mt-20 font-bold text-gray-900 mb-4">
          {product.title.split(" ").slice(0, 2).join(" ")}
          <br />
          {product.title.split(" ").slice(2).join(" ")}
        </h1>
        <div className="mb-4">
          <span className="text-xl font-semibold text-white bg-cyan-600 rounded-2xl py-1 px-2">
            ${product.price} USD
          </span>
          {product.priceWithoutDiscount && (
            <span className="text-md text-gray-500 line-through ml-3">
              ${product.priceWithoutDiscount}
            </span>
          )}
          <hr className="border-gray-300 my-4" />
          <p className="text-gray-700 text-sm mb-6 mt-4">{product.description}</p>
        </div>

        <p className="text-gray-700 text-sm mb-6 mt-4 font-semibold">
          In stock: {product.inventory}
        </p>

        {/* Quantity Section */}
        <div className="flex items-center gap-4 mb-6">
          <p className="text-gray-700 text-lg font-semibold">Quantity:</p>
          {/* Increment Button */}
          <button
            onClick={increaseQuantity}
            className="bg-cyan-600 text-white text-lg px-4 py-2 rounded-full hover:bg-cyan-700"
          >
            +
          </button>
          {/* Display Quantity */}
          <span className="text-gray-700 text-lg font-semibold">{quantity}</span>
          {/* Decrement Button */}
          <button
            onClick={decreaseQuantity}
            disabled={quantity === 1} // Disable minus button if quantity is 1
            className={`${quantity === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-700"
              } text-white text-lg px-4 py-2 rounded-full`}
          >
            -
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex items-center bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700"
        ><CiShoppingCart className="text-white text-4xl ml-0 mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
