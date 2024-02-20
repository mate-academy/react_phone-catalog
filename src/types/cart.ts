export type CartItemType = {
  itemId: string,
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type Cart = CartItemType[];
