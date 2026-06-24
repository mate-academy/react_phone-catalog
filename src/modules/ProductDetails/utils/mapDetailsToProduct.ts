/* eslint-disable import/extensions */
/* eslint-disable max-len */
import { Product } from '../../Catalog/interfaces/Product';
import { PhoneDetails } from '../interfaces/PhoneDetailsInterface';

export const mapDetailsToProduct = (d: PhoneDetails): Product => ({
  id: d.id,
  category: d.category as Product['category'],
  itemId: d.namespaceId,
  name: d.name,
  fullPrice: `${d.priceRegular}`,
  price: `${d.priceDiscount}`,
  screen: d.screen,
  capacity: d.capacity,
  color: d.color,
  ram: d.ram,
  year: new Date().getFullYear(),
  image: d.images[0] ? `${d.images[0]}` : '',
});
