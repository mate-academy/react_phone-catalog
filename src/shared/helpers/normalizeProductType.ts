import { Product } from 'shared/types/Product';
import { ProductDetails } from 'shared/types/ProductDetails';

export function normalizeProductType(product: Product | ProductDetails) {
  const isDetailedProduct = 'images' in product;

  return {
    id: isDetailedProduct ? product.id : product.itemId,
    name: product.name,
    price: isDetailedProduct ? product.priceDiscount : product.price,
    image: isDetailedProduct ? product.images[0] : product.image,
    category: product.category,
  };
}

export type NormalizedProduct = ReturnType<typeof normalizeProductType>;
