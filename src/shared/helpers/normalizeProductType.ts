import { Product } from 'shared/types/Product';
import { ProductDetails } from 'shared/types/ProductDetails';

export function normalizeProductType(
  product: Product | ProductDetails,
): Product {
  const isDetailed = 'images' in product;

  return {
    id: isDetailed ? product.id : product.itemId,
    itemId: isDetailed ? product.id : product.itemId,
    name: product.name,
    fullPrice: isDetailed ? product.priceRegular : product.fullPrice,
    price: isDetailed ? product.priceDiscount : product.price,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: isDetailed ? 2020 : product.year,
    image: isDetailed ? product.images[0] : product.image,
    category: product.category,
  };
}

export type NormalizedProduct = ReturnType<typeof normalizeProductType>;
