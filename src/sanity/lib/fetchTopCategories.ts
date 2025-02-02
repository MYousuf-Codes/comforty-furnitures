import { client } from "@/sanity/lib/client";

export const fetchTopCategories = async () => {
  try {
    const query = `
      *[_type == "categories"]{
        _id,
        title,
        image,
        products
      }
    `;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
