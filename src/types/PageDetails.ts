export type CartNumberOfItems = Record<number, number>;

export type PagesDetails = {
  title: string;
  models: number;
  cartNumberOfItems: CartNumberOfItems;
};
