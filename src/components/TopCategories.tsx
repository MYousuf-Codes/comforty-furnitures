"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import {client} from "@/sanity/lib/client"; // Ensure the correct path to your Sanity client
import { urlFor } from "@/sanity/lib/image"; // Adjust to your project structure
import { ICategory } from "@/types/ICategories";

const TopCategories: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `
        *[_type == "categories"]{
          _id,
          title,
          image,
          count(products) as products
        }
      `;

      try {
        const categories = await client.fetch(query);
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full mt-4">
      <div className="w-full sm:w-4/5 mx-auto">
        <h1 className="text-3xl mb-6 text-center">Top Categories</h1>
        <div className="w-full flex flex-wrap justify-between">
          {categories.map((category: ICategory) => (
            <div key={category._id} className="relative w-full sm:w-1/2 lg:w-1/3 mb-4 px-2">
              {category.image && (
                <Image
                  src={urlFor(category.image).url()}
                  alt={category.title}
                  width={424}
                  height={424}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
              <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white p-3 rounded-b-lg">
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
