import React from 'react';
import { Link } from 'react-router-dom';
import './Category.scss';

type Props = {
  name: string,
  title: string,
  amount: number,
};

export const Category: React.FC<Props> = ({ name, title, amount }) => {
  return (
    <Link
      to={`/${name}`}
      className="Category"
    >
      <img
        className="Category__image"
        src={`/img/categories/category-${name}.png`}
        alt={`Category ${name}`}
      />
      <div className="Category__info">
        <h3
          className="Category__title"
        >
          {title}
        </h3>
        <p className="Category__products-count">
          {`${amount} models`}
        </p>
      </div>
    </Link>
  );
};
