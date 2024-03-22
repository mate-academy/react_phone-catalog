import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Category } from '../../types/Category';

import './CategoriesCard.scss';

type Props = {
  category: Category;
};

export const CategoriesCard: React.FC<Props> = memo(({ category }) => {
  const { path, src, alt, title, count } = category;

  return (
    <Link to={path} className="CategoriesCard" data-cy="categoryLinksContainer">
      <div
        className={`CategoriesCard__imgMask CategoriesCard__imgMask--${path.slice(1)}`}
      >
        <img src={src} alt={alt} className="CategoriesCard__image" />
      </div>
      <h3 className="CategoriesCard__subtitle">{title}</h3>
      <p className="CategoriesCard__count">{count} models</p>
    </Link>
  );
});
