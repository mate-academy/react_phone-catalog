import { Product, ProductType } from '../types/product';

import phoneImg from '../images/some-phone.png';

export const getProduct = (): Product => {
  return {
    age: 0,
    id: 'aaa',
    type: 'phone' as ProductType,
    imageUrl: phoneImg,
    name: 'Iphone',
    snippet: 'aaa',
    price: 700,
    discount: 10,
    screen: 'Some screen',
    capacity: 'Some capacity',
    ram: 'Some ram',
  };
};

export const getProducts = (arrLength: number): Product[] => {
  const products = [];

  for (let i = 0; i < arrLength; i += 1) {
    products.push(getProduct());
  }

  return products;
};
