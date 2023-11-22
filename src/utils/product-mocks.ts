import { Product, ProductDetails, ProductType } from '../types/product';

import phoneImg from '../images/some-phone.png';

export const getProduct = (): Product => {
  return {
    id: '1',
    category: ProductType.PHONE,
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

export const getProductDetails = (): ProductDetails => {
  return {
    id: 'undef',
    namespaceId: 'undef',
    name: 'undef',
    capacityAvailable: [],
    capacity: 'undef',
    priceDiscount: 0,
    priceRegular: 0,
    colorsAvailable: [],
    color: 'undef',
    images: [],
    description: [],
    screen: 'undef',
    resolution: 'undef',
    processor: 'undef',
    ram: 'undef',
    camera: 'undef',
    zoom: 'undef',
    cell: [],
  };
};
