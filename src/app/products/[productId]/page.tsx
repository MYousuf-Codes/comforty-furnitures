import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductDetail from "@/components/ProductDetail"; // Import Client Component

export const fetchProduct = async (productId: string) => {
  const query = `*[_type == "products" && _id == $productId][0]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    image,
    description,
    inventory
  }`;
  
  return client.fetch(query, { productId });
};

// Metadata for SEO
export async function generateMetadata({ params }: { params: { productId: string } }) {
  // Wait for params to be resolved before fetching the product
  const product = await fetchProduct(params.productId);
  return {
    title: product?.title || "Product Details",
  };
}

const ProductDetailPage = async ({ params }: { params: { productId: string } }) => {
  // Await the product fetch here as well
  const product = await fetchProduct(params.productId);

  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
