import React from 'react';
import { ProductCard } from '../shared/components/ProductCard';
import { Product } from '../../types';

const testProduct: Product = {
  id: 1,
  category: 'phones',
  itemId: 'apple-iphone-7-32gb-black',
  name: 'Apple iPhone 7 32GB Black',
  fullPrice: 400,
  price: 375,
  screen: "4.7' IPS",
  capacity: '32GB',
  color: 'black',
  ram: '2GB',
  year: 2016,
  image: 'img/phones/apple-iphone-7/black/00.webp',
};

export const HomePage = () => {
  return <ProductCard product={testProduct} />;
};
