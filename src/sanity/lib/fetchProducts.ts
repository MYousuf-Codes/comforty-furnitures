import { client } from "@/sanity/lib/client";  // Ensure the client is correctly imported
import { IProducts } from "@/types/IProducts";  // Ensure correct types are imported

// Fetch products query from Sanity and return an array of products
export const fetchProducts = async (): Promise<IProducts[]> => {
  const query = `*[_type == "products"]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    image,
    tags
  }`;

  // Fetch and return the products
  return client.fetch(query);
};
