"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

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

const fetchCategories = async (): Promise<ICategory[]> => {
  try {
    const query = `
      *[_type == "categories"]{
        _id,
        title,
        image,
        products
      }
    `;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
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
    <div className="px-4 sm:px-8 lg:px-16 py-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left px-4 sm:px-16">
          Top Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 sm:px-16">
          {categories.map((category) => (
            <Link
              href={`/category/${category._id}`}
              key={category._id}
              className="group relative rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white"
            >
              {category.image && (
                <div className="w-full h-84">
                  <Image
                    src={urlFor(category.image).url()}
                    alt={category.title}
                    width={300}
                    height={700}
                    className="w-full h-full object-center rounded-md"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4">
                <h3 className="text-lg font-bold">{category.title}</h3>
                <p className="text-sm">{category.products} Products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;