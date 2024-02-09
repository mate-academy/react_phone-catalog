import React, { memo } from 'react';

import './CategoriesGallery.scss';
import { Link } from 'react-router-dom';
import { useRequest } from '../../../enhancers/hooks/request';
import {
  CategoryItem as CategoryItemType, getCategories,
} from '../../../api/products/client/categories';
import Placeholder from '../../UI/Placeholder';
import { capitalize } from '../../../utils/stringHelper';

interface Props {
  sectionName?: string,
  setError?: (error: string) => void,
}

export const CategoriesGallery: React.FC<Props> = memo(({ sectionName, setError }) => {
  const [categories, loading, error] = useRequest(getCategories, [], []);
  const showedItems = loading ? Array.from({ length: 3 }, () => null) : categories;

  if (error && setError) {
    setError(error);
  }

  return (
    <section className="categories-gallery">
      <h2 className="categories-gallery__title">
        {sectionName ?? 'Shop by category'}
      </h2>

      {error ? (
        <div className="categories-gallery__error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="categories-gallery__content">
          {showedItems.map((category, index) => (
            <CategoryItem
              category={category}
              key={category?.name ?? index}
            />
          ))}
        </div>
      )}

    </section>
  );
});

interface ItemProps {
  category: CategoryItemType | null,
}

const CategoryItem: React.FC<ItemProps> = memo(({ category }) => {
  if (category === null) {
    return <Placeholder className="category-item__placeholder" />;
  }

  const { name, image, amount } = category;

  return (
    <article className="category-item">
      <Link to={`/${name}`} className="category-item__link">
        <img
          className="category-item__img"
          src={image}
          alt={`Products category: ${name}`}
          loading="lazy"
        />

        <div className="category-item__info">
          <h3 className="category-item__name">{capitalize(name)}</h3>

          <p className="category-item__amount">
            {amount}
            {' '}
            models
          </p>
        </div>
      </Link>
    </article>
  );
});
