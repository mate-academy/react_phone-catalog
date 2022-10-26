import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ProductsContext } from '../../helpers/ProductsContext';

import './ShopByCategory.scss';

export const ShopByCategory: React.FC = () => {
  const { products } = useContext(ProductsContext);

  const phones = useMemo(() => (
    products.filter(product => product.type === 'phone')
  ), [products]);
  const tablets = useMemo(() => (
    products.filter(product => product.type === 'tablet')
  ), [products]);
  const accessories = useMemo(() => (
    products.filter(product => product.type === 'accessories')
  ), [products]);

  return (
    <section className="section shop-by-category">
      <h1 className="section__title">
        Shop by category
      </h1>

      <div className="shop-by-category__categories">
        <ul
          className="categories"
          data-cy="categoryLinksContainer"
        >
          <Link
            to="/phones"
            className="categories__item"
          >
            <img
              src="img/categories/phones.png"
              alt="phones-category"
              className="categories__image"
            />

            <div className="categories__category-title">
              Mobile phones
            </div>

            <div className="categories__category-count">
              {`${phones.length} models`}
            </div>
          </Link>

          <Link
            to="/tablets"
            className="categories__item"
          >
            <img
              src="img/categories/tablets.png"
              alt="phones-category"
              className="categories__image"
            />

            <div className="categories__category-title">
              Tablets
            </div>

            <div className="categories__category-count">
              {`${tablets.length} models`}
            </div>
          </Link>

          <Link
            to="/accessories"
            className="categories__item"
          >
            <img
              src="img/categories/accessories.png"
              alt="phones-category"
              className="categories__image"
            />

            <div className="categories__category-title">
              Accessories
            </div>

            <div className="categories__category-count">
              {`${accessories.length} models`}
            </div>
          </Link>
        </ul>
      </div>
    </section>
  );
};
