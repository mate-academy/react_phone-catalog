import { Product } from '../types/Product';
import { ProductCardItem } from '../types/CartItem';

export function mapToCardItems(products: Product[]): ProductCardItem[] {
  return products.map(p => ({
    id: p.itemId,
    itemId: p.itemId,
    name: p.name,
    price: p.price,
    fullPrice: p.fullPrice,
    image: p.image,
    screen: p.screen,
    ram: p.ram,
    capacity: p.capacity,
    category: p.category,
    color: p.color,
  }));
}
