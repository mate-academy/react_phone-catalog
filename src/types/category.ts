import { Item } from "./item";

export type Category = {
  id: string;
  array: Item[];
  name: string;
  img: string;
  backgroundColor: string;
  to: string;
};
