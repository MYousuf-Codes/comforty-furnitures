// src/types/IProducts.ts

export interface IProducts {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  badge?: string;
  image: string;
  tags?: string[];
  description?: string;
  category: string;
  inventory?: number;
}
