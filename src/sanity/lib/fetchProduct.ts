import { client } from "@/sanity/lib/client";  // Ensure the client is correctly imported

// Fetch single product by its productId
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
