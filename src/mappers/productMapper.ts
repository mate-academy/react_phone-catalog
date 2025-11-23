import { Product } from '../types/product';

export function mapProductToUiModel(product: Product) {
  return {
    id: product.id,
    title: product.name,
    img: product.image,
    price: product.price,
    oldPrice: product.fullPrice > product.price ? product.fullPrice : undefined,
    year: product.year,
    screen: product.screen,
    capacity: product.capacity,
    ram: product.ram,
  };
}
