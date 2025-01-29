import { fetchProduct } from "@/sanity/lib/fetchProduct"; // Import the correct file for a single product
import ProductDetail from "@/components/ProductDetail";

// Updated generateMetadata function to handle params correctly
export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params; // Await the params object

  const product = await fetchProduct(productId);
  return {
    title: product?.title ?? "Product Details", // Page title based on product title
  };
}

// Product detail page component
const ProductDetailPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params; // Await the params object
  const product = await fetchProduct(productId);

  // If product is not found, display an error message
  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
