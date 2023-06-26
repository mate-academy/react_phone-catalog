export type CartProduct = {
  itemId: string;
  image: string;
  price: number;
  name: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  product: CartProduct;
};
