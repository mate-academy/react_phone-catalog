import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const parseProductDetailsToProduct = (
  product: ProductDetails,
): Product => {
  return {
    id: Number(product.id),
    category: product.category,
    itemId: product.namespaceId,
    name: product.name,
    capacity: product.capacity,
    price: product.priceDiscount,
    color: product.color,
    image: product.images[0],
    screen: product.screen,
    ram: product.ram,
    year: 0,
  };
};
