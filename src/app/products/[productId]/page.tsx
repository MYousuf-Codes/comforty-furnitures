import { fetchProduct } from "@/sanity/lib/fetchProduct";  // ✅ Fixed import
import ProductDetail from "@/components/ProductDetail";

export async function generateMetadata({ params }: { params: { productId: string } }) {
  const product = await fetchProduct(params.productId);
  return {
    title: product?.title ?? "Product Details",
  };
}

const ProductDetailPage = async ({ params }: { params: { productId: string } }) => {
  const product = await fetchProduct(params.productId);

  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
