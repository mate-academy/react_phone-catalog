import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/Category';
import { ModelsCounter } from '../ModelsCounter/ModelsCounter';
import './categoryCard.scss';

export type Props = {
  category: Category,
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const {
    id,
    title,
    name,
    itemCount,
  } = category;

  return (
    <Link
      key={id}
      to={`/${name}`}
      className="category-card"
    >
      <div className="category-card__image-container">
        <img
          alt={name}
          className="category-card__img"
          src={`./img/categories/${name}.png`}
        />
      </div>
      <h1 className="category-card__title">
        {title}
      </h1>
      <ModelsCounter number={itemCount} />
    </Link>
  );
};
