import React from 'react';
import { Category } from '../../types/Category';
import { Link } from 'react-router-dom';
import { LOCAL_URL } from '../../api/apiProducts';
import './Categories.scss';

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
          <li className="categories__item" key={key}>
            <Link
              to={`/${value}`}
              className={`
              categories__image-container
              categories__image-container--${value}
            `}
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
