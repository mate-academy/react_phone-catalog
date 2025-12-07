import React, { Fragment, useMemo, useState } from 'react';

import './Cart.scss';
import { Product } from '../../types/Product';
import accessoriesFromServer from '../../../public/api/products.json';
import { ProductCard } from '../ProductCard';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const products: Product[] = useMemo(() => {
    return accessoriesFromServer
      .filter(product => product.category === 'accessories')
      .splice(0, 8);
  }, []);

  return (
    <section className="cart">
      <div className="container cart__container">
        <div className="cart__back">
          <Link to="/" className="cart__back-link">
            <span>&#60;</span>
            <span>Back</span>
          </Link>
        </div>
        <h1 className="cart__title">Cart</h1>

        <div className="cart__wrapper">
          {products.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
