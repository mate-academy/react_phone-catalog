import { ProductDetails } from '../types/ProductDetails';
import { Product } from '../types/Product';

export const mapProductDetailsToProduct = (
  details: ProductDetails,
  category: string,
): Product => ({
  id: details.id,
  category: category,
  itemId: details.id,
  name: details.name,
  fullPrice: details.priceRegular,
  price: details.priceDiscount,
  screen: details.screen,
  capacity: details.capacity,
  color: details.color,
  ram: details.ram,
  year: 0,
  image: details.images[0],
});
