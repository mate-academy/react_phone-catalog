/* eslint-disable max-len */
import './Categories.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

interface Props {
  products: Product[];
}

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const Categories: React.FC<Props> = ({ products }) => {
  const getCount = (cat: string) =>
    products.filter((p: Product) => p.category === cat).length;

  const baseClass = 'categories__img-container';

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__list">
        <div className="categories__item">
          <Link to="/phones" className="categories__link">
            <div className={`${baseClass} ${baseClass}--phones`}>
              <img
                src={`${BASE}img/category-phones.svg`}
                alt="Phones"
                className="categories__img"
              />
            </div>
            <h3 className="categories__name">Mobile phones</h3>
            <p className="categories__count">{`${getCount('phones')} models`}</p>
          </Link>
        </div>

        <div className="categories__item">
          <Link to="/tablets" className="categories__link">
            <div className={`${baseClass} ${baseClass}--tablets`}>
              <img
                src={`${BASE}img/category-tablets.png`}
                alt="Tablets"
                className="categories__img"
              />
            </div>
            <h3 className="categories__name">Tablets</h3>
            <p className="categories__count">{`${getCount('tablets')} models`}</p>
          </Link>
        </div>

        <div className="categories__item">
          <Link to="/accessories" className="categories__link">
            <div className={`${baseClass} ${baseClass}--accessories`}>
              <img
                src={`${BASE}img/category-accessories.png`}
                alt="Accessories"
                className="categories__img"
              />
            </div>
            <h3 className="categories__name">Accessories</h3>
            <p className="categories__count">{`${getCount('accessories')} models`}</p>
          </Link>
        </div>
      </div>
    </section>
  );
};
