import { Product, ProductType } from '../types/product';

import phoneImg from '../images/some-phone.png';

export const getProduct = (): Product => {
  return {
    id: '1',
    category: ProductType.PHONES,
    phoneId: 'apple-iphone-7-32gb-black',
    itemId: 'apple-iphone-7-32gb-black',
    name: 'Apple iPhone 7 32GB Black',
    fullPrice: 400,
    price: 300,
    screen: '4.7 IPS',
    capacity: '32GB',
    color: 'black',
    ram: '2GB',
    year: 2016,
    image: phoneImg,
  };
};

export const getProducts = (arrLength: number): Product[] => {
  const products = [];

  for (let i = 0; i < arrLength; i += 1) {
    products.push(getProduct());
  }

  return products;
};
