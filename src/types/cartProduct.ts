export type Product = {
  name: string;
  price: number;
  image: string;
  category: string;
};

export type CartProduct = {
  id: string;
  quantity: number;
  product: Product;
};
