import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './CategoryCard.scss';
import { Category } from '../../types/Category';

type Props = {
  category: Category,
};

const NUMBER = 95;

export const CategoryCard: React.FC<Props> = ({ category }) => (
  <NavLink
    className="category-card"
    to={category.link}
  >
    <div
      className="category-card__wrapper-img"
      style={{
        backgroundColor: category.backgroundColor,
      }}
    >
      <img
        src={category.imageUrl}
        alt={category.name}
        className={classNames('category-card__img', {
          'category-card__img--transform-scale':
            category.name === 'Accessories',
        })}
      />
    </div>

    <div className="category-card__bottom">
      <h3 className="category-card__name">
        {category.name}
      </h3>

      <p className="category-card__available">
        {`${NUMBER} models`}
      </p>
    </div>
  </NavLink>
);
