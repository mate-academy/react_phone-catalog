import phones from '../../public/api/phones.json';

export const hotPricesPhones = phones.filter(
  phone => phone.name.includes('Apple iPhone 13') && phone.capacity === '256GB',
);
