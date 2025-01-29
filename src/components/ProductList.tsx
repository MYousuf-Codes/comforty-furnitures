"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { IProducts } from "@/types/IProducts";
import { urlFor } from "@/sanity/lib/image";
import { CiShoppingCart } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link"; // Import Link component for dynamic routing

const ProductList = ({ products }: { products: IProducts[] }) => {
  const dispatch = useDispatch();

  // Handle adding to cart
  const handleAddToCart = (product: IProducts) => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        image: urlFor(product.image).url(),
        price: product.price,
        quantity: 1, // Default quantity is 1
      })
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-16 p-6 bg-white">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="relative rounded-lg cursor-pointer shadow-md">
            {/* Link to Product Detail Page */}
            <Link href={`/products/${product._id}`} passHref>
              {/* Badge */}
              {product.badge && (
                <span
                  className={`absolute mt-1 ml-1 top-2 left-2 px-2 py-1 text-white text-sm font-semibold rounded-md ${
                    product.badge === "New" ? "bg-green-500" : "bg-orange-500"
                  }`}
                >
                  {product.badge}
                </span>
              )}

              {/* Product Image */}
              <Image
                src={urlFor(product.image).url()}
                alt={product.title}
                width={250}
                height={300}
                className="w-full h-72 object-cover rounded-md"
              />

              {/* Product Title */}
              <h3 className="mt-4 text-base hover:text-cyan-600 text-gray-800">{product.title}</h3>

              {/* Prices */}
              <div className="mt-2 flex items-center">
                <span className="text-base font-semibold text-gray-800">${product.price}</span>
                {product.priceWithoutDiscount && (
                  <span className="text-sm font-semibold text-gray-500 line-through ml-2">
                    ${product.priceWithoutDiscount}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart Icon */}
            <div
              className="absolute bottom-4 right-4 p-2 bg-gray-200 text-black rounded-lg transition-all hover:text-white hover:bg-cyan-600 cursor-pointer"
              onClick={() => handleAddToCart(product)} // Add to Cart on click
            >
              <CiShoppingCart className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
