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
    <div className="px-4 sm:px-8 lg:px-16 py-6 bg-white">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left px-4 sm:px-16">
        All Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-16">
        {products.map((product) => (
          <div key={product._id} className="relative rounded-lg cursor-pointer bg-white">
            
            {/* Link to Product Detail Page */}
            <Link href={`/products/${product._id}`} passHref>
              {/* Badge */}
              {product.badge && (
                <span
                  className={`absolute top-2 left-2 px-2 py-1 text-white text-sm font-semibold rounded-md ${
                    product.badge === "New" ? "bg-green-500" : "bg-orange-500"
                  }`}
                >
                  {product.badge}
                </span>
              )}

              {/* Product Image */}
              <div className="w-full h-72 mb-4">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.title}
                  width={250}
                  height={300}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Product Title */}
              <h3 className="text-base text-gray-800 hover:text-cyan-600 mb-2">
                {product.title}
              </h3>

              {/* Prices */}
              <div className="mb-4">
                <span className="text-base font-semibold text-gray-800">
                  ${product.price}
                </span>
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
