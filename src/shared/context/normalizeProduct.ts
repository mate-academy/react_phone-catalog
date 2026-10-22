import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';

export const isProductDetails = (
  item: Product | ProductDetails,
): item is ProductDetails => 'priceDiscount' in item;

export const normalizeProduct = (
  product: Product | ProductDetails,
): Product => {
  if (!isProductDetails(product)) {
    return product;
  }

  return {
    id: product.id,
    category: product.category,

    itemId: `${product.namespaceId}-${product.capacity}-${product.color}`,

    name: product.name,

    price: product.priceDiscount,
    fullPrice: product.priceRegular,

    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,

    year: 0,

    image: product.images?.[0] ?? '/img/placeholders/no-image.png',
  };
};
