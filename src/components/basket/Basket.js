import React from 'react';
import BasketItem from '../basketItem/BasketItem';

const Basket = ({ basketList, increaseQuantity, reduceQuantity, removeItem }) => {
  return (
    <section className="basketItems">
      {basketList.map(item => <BasketItem
        key={item.id}
        basketItem={item}
        increaseQuantity={increaseQuantity}
        reduceQuantity={reduceQuantity}
        removeItem={removeItem}
      />)}
    </section>
  );
};

export default Basket;
