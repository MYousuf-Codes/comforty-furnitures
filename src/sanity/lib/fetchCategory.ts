import { client } from "@/sanity/lib/client";

export interface ICategory {
    _id: string;
    title: string;
    image: {
        asset: {
            _ref: string;
        };
    };
}

export const fetchCategory = async (): Promise<ICategory[]> => {
    try {
        const query = `*[_type == "categories"]{ _id, title, image }`;
        return await client.fetch(query);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};
