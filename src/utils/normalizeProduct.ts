import { Product, Products } from '../types/Product';

export function normalizeProduct(p: Product): Products {
  return {
    id: p.id,
    category: p.category,
    name: p.name,
    capacity: p.capacity,
    color: p.color,
    ram: p.ram,
    screen: p.screen,
    itemId: p.id,
    fullPrice: p.priceRegular,
    price: p.priceDiscount,
    image: p.images[0],
    year: 0,
  };
}
