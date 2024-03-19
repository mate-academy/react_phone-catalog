import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Category.scss';
import { API_URL } from '../utils/api-phones';
import { GlobalContext } from '../GlobalContext';
// import { Product } from '../types/Product';

const CATEGORY_ITEMS = ['Mobile phones', 'Tablets', 'Accessories'];

export const Category: React.FC = () => {
  const { phones, tablets, accessories } = useContext(GlobalContext);

  const category = {
    phones,
    tablets,
    accessories,
  };

  return (
    <section className="Category">
      <h2 className="Category__title">Shop by category</h2>

      <div className="Category__block">
        {CATEGORY_ITEMS.map(item => {
          const link = item === 'Mobile phones' ? 'phones' : item.toLowerCase();

          return (
            <Link
              key={link}
              to={link}
              className={`Category__link--${link}`}
              data-cy="categoryLinksContainer"
            >
              <div
                className={`Category__photo-container Category__photo-container--${link}`}
              >
                <img
                  src={`${API_URL}img/category-${link}.png`}
                  className="Category__photo"
                  alt="category"
                />
              </div>

              <h3 className="Category__items-title">{item}</h3>

              <span className="Category__count">
                {`${category[link as keyof typeof category].length} models`}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
