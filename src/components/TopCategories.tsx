"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Ensure correct path to your Sanity client
import { urlFor } from "@/sanity/lib/image"; // Adjust to your project structure
import Image from "next/image";
import Link from "next/link"; // Import Link from next/router

// Type for category data
interface ICategory {
  _id: string;
  title: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  products: number;
}

// Fetch Categories from Sanity
const fetchCategories = async (): Promise<ICategory[]> => {
  const query = `
    *[_type == "categories"]{
      _id,
      title,
      image,
      products
    }
  `;
  const categories = await client.fetch(query);
  return categories;
};

const TopCategories: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    getCategories();
  }, []);

  return (
    <div className="w-full mt-4">
      <div className="w-full sm:w-4/5 mx-auto">
        <h1 className="text-3xl mb-6 text-center">Top Categories</h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="relative group rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Category Image */}
              {category.image && (
                <Image
                  src={urlFor(category.image).url()}
                  alt={category.title}
                  width={424}
                  height={424}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Hover effect for shadow and text */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center text-white text-center p-4 rounded-lg">
                <div className="text-lg">{category.title}</div>
                <div className="text-sm">{category.products} Products</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
