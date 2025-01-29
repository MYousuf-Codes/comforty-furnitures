import ProductList from "@/components/ProductList"; // Client Component
import { fetchProducts } from "@/sanity/lib/fetchProducts"; // Fetch function

const ProductPage = async () => {
  const products = await fetchProducts(); // Fetch products in a Server Component
  return <ProductList products={products} />; // Pass data to Client Component
};

export default ProductPage;
