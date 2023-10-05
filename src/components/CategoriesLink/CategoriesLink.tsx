import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Category } from '../../types/Category';

import './CategoriesLink.scss';

type Props = {
  category: Category,
};

export const CategoriesLink: FC<Props> = ({ category }) => {
  return (
    <div className="categories__link">
      <Link to={category.url} className="category__item">
        <div className="category__image-container">
          <img
            src={category.imgSrc}
            alt={category.title}
            className="category__image"
          />
        </div>
        <p className="category__title">{category.title}</p>
        <p className="category__description">{`${category.count} models`}</p>
      </Link>
    </div>
  );
};
