import { client } from "@/sanity/lib/client";  // Ensure client is correct
import { IProducts } from "@/types/IProducts";  // Ensure correct types are imported

export const fetchProducts = async (): Promise<IProducts[]> => {
  const query = `*[_type == "products"]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    image,
    category->{
    title
  },
    tags
  }`;

  return client.fetch(query);
};
