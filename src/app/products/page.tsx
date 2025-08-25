
import ProductList from "@/components/ProductList"; 
import { fetchProducts } from "@/sanity/lib/fetchProducts";

const ProductPage = async () => {
  const products = await fetchProducts(); // Fetch products in a Server Component
  return <ProductList products={products} />; // Pass data to Client Component
};

export default ProductPage;
