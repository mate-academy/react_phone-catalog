import { PhoneDetails } from '../types/PhoneDetails';
import { Product } from '../types/Product';

export const mapDetailsToProduct = (details: PhoneDetails): Product => ({
  id: details.id,
  category: '',
  itemId: details.id,
  name: details.name,
  price: details.priceDiscount ?? 0,
  fullPrice: details.priceRegular ?? 0,
  screen: details.screen,
  capacity: details.capacity,
  color: details.color,
  ram: details.ram,
  image: `/react_phone-catalog/${details.images[0]}`,
});
