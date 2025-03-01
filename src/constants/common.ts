import phones from '../../public/api/products.json';
  export const newPhonews = phones.filter(
    product => product.category === 'phones' && product.year > 2021,
  );
