export interface ICategory {
    _id: string;
    title: string;
    description?: string;
    slug: {
        _type: string;
        current: string;
    };
    image?: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    };
    products?: number; // Add the products field here
}