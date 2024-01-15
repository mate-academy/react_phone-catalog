import './Categories.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, IMAGE_BASE_URL } from '../../helpers/constants';
import { Product } from '../../types/Product';

interface Props {
  products: Product[],
  isLoader: boolean,
}

export const Categories:React.FC<Props> = ({ products, isLoader }) => {
  return (
    <article className="categories">
      <h1 className="categories__title">Shop by category</h1>

      <div className="categories__content">
        {Object.entries(CATEGORIES).map(([key, value]) => {
          const models = products.filter(p => p.category === key).length;

          return (
            <Link
              to={`/${key}`}
              key={key}
              className="category"
            >
              <div className={`category__photo category__photo--${key}`}>
                <img
                  src={`${IMAGE_BASE_URL}img/category/category-${key}.png`}
                  className={`category__image category__image--${key}`}
                  alt={key}
                />
              </div>

              <h3 className="category__name">{value}</h3>
              {isLoader
                ? <p className="category__models">processing...</p>
                : <p className="category__models">{`${models} models`}</p>}
            </Link>
          );
        })}
      </div>
    </article>
  );
};
