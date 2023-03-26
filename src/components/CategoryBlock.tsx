import React from 'react';
import classNames from 'classnames';
import { HeaderLink } from './HeaderLink';
import { CategoryApi } from '../types/CategoryApi';

type Props = {
  categoryApi: CategoryApi[],
};

const path = process.env.PUBLIC_URL;

export const CategoryBlock: React.FC<Props> = ({ categoryApi }) => {
  return (
    <ul className="category-shop__container">
      {categoryApi.map((category, index) => (
        <li className="category-block" key={category.title}>
          <img
            src={path + category.picture}
            alt={category.title}
            className={classNames(
              'category-block__picture',
              { 'category-block__picture--gray-white': index === 0 },
              { 'category-block__picture--gray-secondary': index === 1 },
              { 'category-block__picture--purple': index === 2 },
            )}
          />
          <HeaderLink
            to={`/${category.name}`}
            text={category.title}
            className="category-block__title"
          />
          <div className="category-block__info">
            {category.number}
          </div>
        </li>
      ))}
    </ul>
  );
};
