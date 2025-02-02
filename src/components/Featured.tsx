"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { client } from "@/sanity/lib/client";
import { IProducts } from "@/types/IProducts";
import { urlFor } from "@/sanity/lib/image";
import { CiShoppingCart } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure you import styles

const fetchProducts = async () => {
  const query = `
        *[_type == "products" && "featured" in tags][0...4]{
            _id,
            title,
            price,
            priceWithoutDiscount,
            badge,
            image,
            tags
        }
    `;
  const products = await client.fetch(query);
  return products;
};

const Featured = () => {
  const [products, setProducts] = useState<IProducts[]>([]); // State to hold products
  const dispatch = useDispatch();
  const router = useRouter(); // Use router hook for navigation

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts); // Set products state once fetched
    };

    loadProducts(); // Load products when component mounts
  }, []);

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
    toast.success(`${product.title} has been added to the cart!`, {
      position: "bottom-right",
      autoClose: 3000, // Toast disappears in 3 seconds
      closeOnClick: true, 
      pauseOnHover: true,
      draggable: true,
      progress: undefined, // Default progress bar for smooth closing
      theme: "light", // Optional: Use "dark" if you prefer
      onClick: () => router.push("/cart"), // Navigate to cart on click
    });
  };
  
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-6 bg-white">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left px-4 sm:px-16">
        Featured Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-16">
        {products.map((product: IProducts) => (
          <div key={product._id} className="relative rounded-lg cursor-pointer bg-white">
            {/* Badge */}
            {product.badge && (
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-white text-sm font-semibold rounded-md ${product.badge === "New" ? "bg-green-500" : "bg-orange-500"
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
                height={500}
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

            {/* Add to Cart Button */}
            <div
              className="absolute bottom-4 right-4 p-2 bg-gray-200 text-black rounded-lg transition-all hover:text-white hover:bg-cyan-600 cursor-pointer"
              onClick={(e) => {
                e.preventDefault(); // Prevents navigation
                handleAddToCart(product); // Add to Cart on click
              }}
            >
              <CiShoppingCart className="w-6 h-6" />
            </div>

            {/* Product Detail Link */}
            <Link href={`/products/${product._id}`}>
              {/* No need to modify Link, it's used for product detail page */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
