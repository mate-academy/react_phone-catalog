import React from 'react';
import './CategoryItem.scss';
import type { CategoryInfo } from '../../../../shared/types/Category';

type CategoryItemProps = {
  category: CategoryInfo;
};

export const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <article className="category" key={category.title}>
      <div className="category__image-wrapper">
        <img className="category__image" src={category.src} alt="" />
      </div>
      <div className="category__info">
        <h2 className="category__info--name">{category.title}</h2>
        <h3 className="category__info--quantity">{category.info}</h3>
      </div>
    </article>
  );
};
