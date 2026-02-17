import { read, write } from '../utils/storage';

export interface CartItem {
  id: string;
  color: string;
  capacity: string;
  quantity: number;
}

const KEY = 'cart';

function getAll(): CartItem[] {
  return read<CartItem[]>(KEY, []);
}

function commit(items: CartItem[]) {
  write(KEY, items);
  window.dispatchEvent(new Event('storage-update'));
}

export function getCart(): CartItem[] {
  return getAll();
}

export function getCartCount(): number {
  return getAll().reduce((sum, i) => sum + i.quantity, 0);
}

export function addToCart(
  id: string,
  color: string,
  capacity: string
) {
  const items = getAll();
  const found = items.find(
    i => i.id === id && i.color === color && i.capacity === capacity
  );

  if (found) {
    found.quantity += 1;
  } else {
    items.push({ id, color, capacity, quantity: 1 });
  }

  commit(items);
}

export function removeFromCart(
  id: string,
  color: string,
  capacity: string
) {
  const items = getAll()
    .map(i =>
      i.id === id && i.color === color && i.capacity === capacity
        ? { ...i, quantity: i.quantity - 1 }
        : i
    )
    .filter(i => i.quantity > 0);

  commit(items);
}
export function isInCart(
  id: string,
  color: string,
  capacity: string
): boolean {
  return getAll().some(
    i => i.id === id && i.color === color && i.capacity === capacity
  );
}