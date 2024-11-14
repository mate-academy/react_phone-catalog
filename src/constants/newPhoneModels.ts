import phones from '../../public/api/phones.json';
import productList from '../../public/api/products.json';
import { newestYearPhone } from './newestYearProduct';

export const newPhoneModels = phones.filter(phone => {
  const productionYear = productList.find(
    product => product.itemId === phone.id,
  )?.year;

  return productionYear === newestYearPhone && phone.capacity === '256GB';

  // phone.name.includes('Apple iPhone 14') && phone.capacity === '256GB';
});
