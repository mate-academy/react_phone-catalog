import React from 'react';
import { Link } from 'react-router-dom';

import './CategoryItem.scss';

type Props = {
  name: string,
  title: string,
  amount: number,
};

export const CategoryItem: React.FC<Props> = ({ name, title, amount }) => {
  return (
    <Link
      to={`/${name}`}
      className="CategoryItem"
    >
      <img
        src={`img/categories/category-${name}.png`}
        alt={`Category ${name}`}
        className="CategoryItem__image"
      />

      <div className="CategoryItem__info">
        <h3
          className="CategoryItem__title"
        >
          {title}
        </h3>

        <p className="CategoryItem__count">
          {`${amount} models`}
        </p>
      </div>
    </Link>
  );
};
