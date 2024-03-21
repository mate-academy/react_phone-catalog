import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ProductsContext } from '../../store/ProductsContext';

import './Categories.scss';
import { API_URL } from '../../utils/api';

export const Categories: React.FC = () => {
  const { products } = useContext(ProductsContext);

  const phonesCount = useMemo(
    () => products.filter(product => product.category === 'phones').length,
    [products],
  );

  const tabletsCount = useMemo(
    () => products.filter(product => product.category === 'tablets').length,
    [products],
  );

  const accessoriesCount = useMemo(
    () => products.filter(product => product.category === 'accessories').length,
    [products],
  );

  return (
    <section className="Categories Main__categories">
      <h1 className="Categories__title">Shop by category</h1>

      <Link
        to="/phones"
        className="Categories__card"
        data-cy="categoryLinksContainer"
      >
        <div className="Categories__imgMask Categories__imgMask--phones">
          <img
            src={`${API_URL}/img/category-phones.png`}
            alt="Phones Category"
          />
        </div>
        <h3 className="Categories__subtitle">Mobile phones</h3>
        <p className="Categories__count">{phonesCount} models</p>
      </Link>

      <Link
        to="/tablets"
        className="Categories__card"
        data-cy="categoryLinksContainer"
      >
        <div className="Categories__imgMask Categories__imgMask--tablets">
          <img
            src={`${API_URL}/img/category-tablets.png`}
            alt="Tablets Category"
          />
        </div>

        <h3 className="Categories__subtitle">Tablets</h3>
        <p className="Categories__count">{tabletsCount} models</p>
      </Link>

      <Link
        to="/accessories"
        className="Categories__card"
        data-cy="categoryLinksContainer"
      >
        <div className="Categories__imgMask Categories__imgMask--accessories">
          <img
            src={`${API_URL}/img/category-accessories.png`}
            alt="Accessories Category"
          />
        </div>

        <h3 className="Categories__subtitle">Accessories</h3>
        <p className="Categories__count">{accessoriesCount} models</p>
      </Link>
    </section>
  );
};
