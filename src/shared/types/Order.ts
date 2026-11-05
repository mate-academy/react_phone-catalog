export type Order = {
  id: string;
  products: {
    productId: number;
    quantity: number;
  }[];
  ttn: string;
};
