interface Item {
  id: string;
}

interface CartItem extends Item {
  id: string;
  amount: number;
}

export { type Item, type CartItem };
