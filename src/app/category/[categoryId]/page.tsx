"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
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
  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!categoryId) return;

    // Ensure categoryId is a string
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">{category.title}</h2>
      <Image
        src={urlFor(category.image).url()}
        alt={category.title}
        width={800}
        height={400}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <h3 className="text-2xl font-semibold mb-4">Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id}>
            <div className="group relative rounded-lg overflow-hidden">
              <Image
                src={urlFor(product.image).url()}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="text-lg font-semibold">{product.title}</h4>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
