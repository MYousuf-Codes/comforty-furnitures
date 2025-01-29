import { client } from "@/sanity/lib/client"; // Adjust path as necessary
import { IProducts } from "@/types/IProducts"; // Adjust path as necessary
import { urlFor } from "@/sanity/lib/image"; // Import the urlFor function
import { CiShoppingCart } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/router

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

const Featured = async () => {
  const products = await fetchProducts();

  return (
    <div className="px-16 p-6 bg-white first-main">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6 px-16">Featured Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-3 contain h-mx-auto px-16">
        {products.map((product: IProducts) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <div
              className="relative rounded-lg cursor-pointer"
            >
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
                height={500}
                className="w-full h-72 object-cover rounded-md"
              />

              {/* Product Title */}
              <h3 className="mt-4 text-base hover:text-cyan-600 text-gray-800">
                {product.title}
              </h3>

              {/* Prices */}
              <div className="mt-2">
                <span className="text-base font-semibold text-gray-800">
                  ${product.price}
                </span>
                {product.priceWithoutDiscount && (
                  <span className="text-sm font-semibold text-gray-500 line-through ml-2">
                    ${product.priceWithoutDiscount}
                  </span>
                )}
              </div>

              {/* Cart Icon */}
              <div className="absolute bottom-4 right-4 p-2 bg-gray-200 text-black rounded-lg transition-all hover:text-white hover:bg-cyan-600 right-icon">
                <CiShoppingCart className="w-6 h-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Featured;
