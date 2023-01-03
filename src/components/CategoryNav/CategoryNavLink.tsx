import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  path: string,
  name: string,
  type: string,
  models: number,
};

export const CategoryNavLink: React.FC<Props> = ({
  path,
  name,
  type,
  models,
}) => {
  return (
    <div className="category-nav__container">
      <Link to={path}>
        <div
          className={`
            category-nav__item
            category-nav__item--${type}
          `}
        />
      </Link>

      <h2 className="category-nav__title">
        {name}
      </h2>

      <p className="category-nav__models">
        {`${models} models`}
      </p>
    </div>
  );
};
