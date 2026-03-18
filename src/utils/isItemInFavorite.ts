import { Product } from '../types/Product';

export function isItemInFavorite(items: Product[], itemId: string): boolean {
  return items.some(item => item.itemId === itemId);
}
