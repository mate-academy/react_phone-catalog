import React from 'react';
import './HomeCategoryItem.scss';
import type { Category } from '../../../../shared/types/Category';
import { Link } from 'react-router-dom';

type HomeCategoryItemProps = {
  category: Category;
};

export const HomeCategoryItem: React.FC<HomeCategoryItemProps> = ({
  category,
}) => {
  return (
    <Link to={`${category.category}`} className="category" key={category.title}>
      <div className="category__image-wrapper">
        <img
          className="category__image"
          src={category.src}
          alt={`${category}`}
        />
      </div>
      <div className="category__info">
        <h2 className="category__info--name">{category.title}</h2>
        <h3 className="category__info--quantity">{category.info}</h3>
      </div>
    </Link>
  );
};
