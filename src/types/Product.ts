export type Product = {
  id: string;
  name: string;
  category: string;
  itemId: string;
  phoneId: string;
  price: number;
  fullPrice: number;
  image: string;
  capacity: string;
  color: string;
  ram: string;
  screen: string;
  year: number;
};

export type CartProduct = Product & {
  amount: number;
};
