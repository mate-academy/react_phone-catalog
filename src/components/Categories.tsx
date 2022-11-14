/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from './ProductsContext';

export const Categories = React.memo(() => {
  const { products } = useContext(ProductsContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const phoneCount = products.filter(product => product.type === 'phone').length;
  const tabletCount = products.filter(product => product.type === 'tablet').length;
  const accessoriesCount = products.filter(product => product.type === 'accessories').length;

  return (
    <div className="container categories grid" data-cy="categoryLinksContainer">
      <h1 className="categories__title grid__item--1-7">Shop by category</h1>

      <Link
        to="phones"
        className="categories__category categories__category--1 grid__item--1-8"
      >
        <img src="img/phones.jpg" alt="phone" className="categories__img" />

        <h3 className="categories__title">Mobile phones</h3>

        <p className="categories__quantity body-text">{`${phoneCount} models`}</p>
      </Link>

      <Link
        to="tablets"
        className="categories__category categories__category--2 grid__item--9-16"
      >
        <img src="img/tablets.jpg" alt="tablet" className="categories__img" />

        <h3 className="categories__title">Tablets</h3>

        <p className="categories__quantity body-text">{`${tabletCount} models`}</p>
      </Link>

      <Link
        to="accessories"
        className="categories__category categories__category--3 grid__item--17-24"
      >
        <img
          src="img/accessories.jpg"
          alt="accessory"
          className="categories__img"
        />

        <h3 className="categories__title">Accessories</h3>

        <p className="categories__quantity body-text">{`${accessoriesCount} models`}</p>
      </Link>
    </div>
  );
});
