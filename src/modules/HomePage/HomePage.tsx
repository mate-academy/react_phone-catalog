import React, { useContext } from 'react';
import { CartItem } from '../shared/components/CartItem';
import { Product } from '../../types';
import { CartContext } from '../../context/CartContext';
import { ProductCard } from '../shared/components/ProductCard';

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
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <ProductCard product={testProduct} />
      {cartItems.map(item => (
        // eslint-disable-next-line max-len
        <CartItem
          key={item.product.id}
          product={item.product}
          quantity={item.quantityCarts}
        />
      ))}
    </>
  );
};
