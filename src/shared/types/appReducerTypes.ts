interface Item {
  id: string;
  category: string;
}

interface CartItem extends Item {
  amount: number;
}

export { type Item, type CartItem };
