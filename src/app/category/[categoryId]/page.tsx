"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { CiShoppingCart } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";

interface IProduct {
  _id: string;
  title: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  price: number;
  priceWithoutDiscount?: number;
  badge?: string;
}

interface ICategory {
  _id: string;
  title: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

const fetchCategory = async (id: string): Promise<ICategory | null> => {
  try {
    const query = `*[_type == "categories" && _id == "${id}"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

const fetchProducts = async (categoryId: string): Promise<IProduct[]> => {
  try {
    const query = `*[_type == "products" && references("${categoryId}")]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!categoryId) return;
    const categoryIdStr = Array.isArray(categoryId) ? categoryId[0] : categoryId;

    const getCategory = async () => {
      const categoryData = await fetchCategory(categoryIdStr);
      setCategory(categoryData);
    };

    const getProducts = async () => {
      const productsData = await fetchProducts(categoryIdStr);
      setProducts(productsData);
    };

    getCategory();
    getProducts();
  }, [categoryId]);

  if (!category) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-6 bg-white">
      {/* Small Banner */}
      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{category.title}</h2>
        <div className="w-24 sm:w-32 h-24 sm:h-32">
          <Image
            src={urlFor(category.image).url()}
            alt={category.title}
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-16">
        {products.map((product) => (
          <div key={product._id} className="relative rounded-lg cursor-pointer bg-white">
            <Link href={`/products/${product._id}`} passHref>
              {product.badge && (
                <span
                  className={`absolute top-2 left-2 px-2 py-1 text-white text-sm font-semibold rounded-md ${
                    product.badge === "New" ? "bg-green-500" : "bg-orange-500"
                  }`}
                >
                  {product.badge}
                </span>
              )}
              <div className="w-full h-72 mb-4">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.title}
                  width={250}
                  height={300}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h3 className="text-base text-gray-800 hover:text-cyan-600 mb-2">{product.title}</h3>
              <div className="mb-4">
                <span className="text-base font-semibold text-gray-800">${product.price}</span>
                {product.priceWithoutDiscount && (
                  <span className="text-sm font-semibold text-gray-500 line-through ml-2">
                    ${product.priceWithoutDiscount}
                  </span>
                )}
              </div>
            </Link>
            <div
              className="absolute bottom-4 right-4 p-2 bg-gray-200 text-black rounded-lg transition-all hover:text-white hover:bg-cyan-600 cursor-pointer"
              onClick={() => dispatch(addToCart({
                id: product._id,
                name: product.title,
                image: urlFor(product.image).url(),
                price: product.price,
                quantity: 1,
              }))}
            >
              <CiShoppingCart className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
