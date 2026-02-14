import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const convertToProduct = (details: ProductDetails): Product => ({
  id: parseInt(details.id) || 0,
  itemId: details.id,
  category: details.category as 'phones' | 'tablets' | 'accessories',
  name: details.name,
  fullPrice: details.priceRegular,
  price: details.priceDiscount || details.priceRegular,
  screen: details.screen,
  capacity: details.capacity,
  color: details.color,
  ram: details.ram,
  year: new Date().getFullYear(),
  image: `/${details.images[0]}`,
});
