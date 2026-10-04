import { Product } from '@/shared/types/Product';
import { ProductDetails } from '@/shared/types/ProductDetails';

export const mapProductDetails = (product: ProductDetails): Product => ({
  id: product.id,
  category: product.category,
  itemId: product.id,
  name: product.name,
  namespaceId: product.namespaceId,
  fullPrice: product.priceRegular,
  price: product.priceDiscount,
  screen: product.screen,
  capacity: product.capacity,
  color: product.color,
  ram: product.ram,
  year: 0,
  image: product.images[0],
});
