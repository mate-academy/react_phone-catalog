import React, {useContext}  from 'react';
import { BasketContext } from './App';

const BasketPage = () => {
  const { items } = useContext(BasketContext);

  const unicalItems = new Set(items);

  console.log(unicalItems);

  return (
  <section className="basket-container">
  1
  </section>
  )
}

export default BasketPage;
