import phones from '../../public/api/phones.json';

export const newPhoneModels = phones.filter(
  phone => phone.name.includes('Apple iPhone 14') && phone.capacity === '128GB',
);
