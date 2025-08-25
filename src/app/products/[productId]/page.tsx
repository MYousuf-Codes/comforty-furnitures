import { fetchProduct } from "@/sanity/lib/fetchProduct";
import ProductDetail from "@/components/ProductDetail";
import Featured from "@/components/Featured";

const ProductDetailPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  const product = await fetchProduct(productId); // Fetch product on the server

  return (
    <div>
      <ProductDetail product={product} />
      <div>
        <Featured />
      </div>
    </div>
  );
};

export default ProductDetailPage;
