import { Product } from "./product";

export type CartObject = {
  product: Product,
  quantity: number;
  id: string;
};