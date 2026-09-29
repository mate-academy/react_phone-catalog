import { DeviceDetails, Product } from '../types/product.types';

export function toProduct(details: DeviceDetails): Product {
  return {
    id: 0,
    category: details.category,
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
  };
}
