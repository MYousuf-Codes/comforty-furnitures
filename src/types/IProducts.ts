export interface IProducts {
    _id: string;
    title: string;
    price: number;
    priceWithoutDiscount: number;
    badge: string;
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    tags: string[];
  }
  