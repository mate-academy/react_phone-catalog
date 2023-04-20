import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CategoryApi } from '../types/CategoryApi';

type Props = {
  categoryApi: CategoryApi[],
};

export const CategoryBlock: React.FC<Props> = ({ categoryApi }) => {
  return (
    <ul className="category-shop__container">
      {categoryApi.map((category, index) => (
        <li className="category-block" key={category.title}>
          <img
            src={category.picture}
            alt={category.title}
            className={classNames(
              'category-block__picture',
              { 'category-block__picture--gray-white': index === 0 },
              { 'category-block__picture--gray-secondary': index === 1 },
              { 'category-block__picture--purple': index === 2 },
            )}
          />
          <Link
            to={`/${category.name}`}
            className="category-block__title"
          >
            {category.title}
          </Link>
          <div className="category-block__info">
            {category.number}
          </div>
        </li>
      ))}
    </ul>
  );
};
