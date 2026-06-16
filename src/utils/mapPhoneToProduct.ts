import { Phone } from '../types/Phone';

export const mapPhoneToProduct = (phone: Phone) => ({
  id: phone.id,
  title: phone.name,
  price: phone.priceDiscount,
  image: phone.images[0],
  screen: phone.screen,
  capacity: phone.capacity,
  ram: phone.ram,
});
