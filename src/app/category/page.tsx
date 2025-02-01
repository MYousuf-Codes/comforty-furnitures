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
}

const fetchCategories = async (): Promise<ICategory[]> => {
    try {
        const query = `*[_type == "categories"]{ _id, title, image }`;
        return await client.fetch(query);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData);
        };
        getCategories();
    }, []);

    return (
        <div className="container bg-white max-w mx-auto px-4 py-6">
            <h2 className="text-3xl font-semibold mb-6">Categories</h2>
            <p className="text-lg mb-4">Browse products by categories</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link href={`/category/${category._id}`} key={category._id}>
                        <div className="group relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                            <Image
                                src={urlFor(category.image).url()}
                                alt={category.title}
                                width={424}
                                height={424}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg font-bold">
                                {category.title}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;