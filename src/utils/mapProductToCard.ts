import { Product } from '../types/Product';
import { ProductCardItem } from '../types/ProductCardItem';

export const mapProductToCard = (product: Product): ProductCardItem => {
  return {
    id: String(product.itemId),
    name: product.name,
    price: product.price,
    discount: product.fullPrice,
    image: product.image ?? '',
    category: product.category,
    screen: product.screen ?? '',
    capacity: product.capacity ?? '',
    ram: product.ram ?? '',
    year: product.year ?? 0,
  };
};
