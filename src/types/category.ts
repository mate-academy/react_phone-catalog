import { Product } from "./product";

export type Category = {
  id: string;
  array: Product[];
  name: string;
  img: string;
  backgroundColor: string;
  to: string;
};
