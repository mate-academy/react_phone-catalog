import React, { memo } from 'react';

import './CategoriesGallery.scss';
import { useRequest } from '../../../enhancers/hooks/request';
import { CategoryItem as CategoryItemType, getCategories } from '../../../api/products/client/categories';
import { Link } from 'react-router-dom';
import Placeholder from '../../UI/Placeholder';
import { capitalize } from '../../../utils/stringHelper';

interface Props {
  sectionName?: string,
}

export const CategoriesGallery: React.FC<Props> = memo(({ sectionName }) => {
  const [categories, loading] = useRequest(getCategories, [], []);

  const showedItems = loading ? Array.from({ length: 3 }, () => null) : categories;

  return (
    <section className='categories-gallery'>
      <h2 className='categories-gallery__title'>
        {sectionName ?? 'Shop by category'}
      </h2>

      <div className="categories-gallery__content">
        {showedItems.map((category) => <CategoryItem category={category}/>)}
      </div>
    </section>
  );
});

interface ItemProps {
  category: CategoryItemType | null,
}

const CategoryItem: React.FC<ItemProps> = memo(({category}) => {
  if (category === null) {
    return <Placeholder className='category-item__placeholder' />
  }

  const {name, image, amount} = category;

  return (
    <article className='category-item'>
      <Link to={`/${name}`} className='category-item__link'>
        <img
          className='category-item__img'
          src={image}
          alt={`Products category: ${name}`}
          loading='lazy'
        />

        <div className='category-item__info'>
          <h3 className='category-item__name'>{capitalize(name)}</h3>

          <p className='category-item__amount'>{amount} models</p>
        </div>
      </Link>
    </article>
  );
});