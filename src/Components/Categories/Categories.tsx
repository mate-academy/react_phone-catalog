import React from 'react';
import './Categories.scss';
import { Category } from '../../Types/Category';
import { Link } from 'react-router-dom';
import { LOCAL_URL } from '../../api/apiProducts';

type Props = {
  amount: {
    phones: number;
    tablets: number;
    accessories: number;
  };
};

export const Categories: React.FC<Props> = ({ amount }) => {
  return (
    <div className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <ul className="categories__list">
        {Object.entries(Category).map(([key, value]) => (
          <li key={key} className="categories__item">
            <Link
              to={`/${value}`}
              className={`categories__image-container categories__image-container--${value}`}
            >
              <img
                src={`${LOCAL_URL}/img/category-${value}.webp`}
                alt={key}
                className="categories__image"
              />
            </Link>

            <Link to={`/${value}`} className="categories__items-container">
              <h3 className="categories__items-title">{key}</h3>

              <p className="categories__items-count">
                {`${amount[value]} models`}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
