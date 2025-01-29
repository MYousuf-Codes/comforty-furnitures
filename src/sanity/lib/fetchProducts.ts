import { client } from "@/sanity/lib/client";
import { IProducts } from "@/types/IProducts";

export const fetchProducts = async (): Promise<IProducts[]> => {
  const query = `
    *[_type == "products"]{
      _id,
      title,
      price,
      priceWithoutDiscount,
      badge,
      image,
      tags
    }
  `;
  return client.fetch(query);
};
