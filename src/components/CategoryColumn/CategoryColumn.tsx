import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryColumn.scss';

type Props = {
  title: string;
  quantity: number;
};

export const CategoryColumn: React.FC<Props> = React.memo(
  ({ title, quantity }) => {
    return (
      <div className="category-column shop-by-category__category-column">
        <Link to={`/${title}`} className="category-column__link">
          <img
            src={`./img/category/${title}.png`}
            alt={title}
            className="category-column__image"
          />
        </Link>
        <div className="category-column__info">
          <h4 className="category-column__title">
            {title}
          </h4>
          <span className="category-column__count">
            {quantity ? `${quantity} models` : ''}
          </span>
        </div>
      </div>
    );
  },
);
