/* eslint-disable max-len */
/* eslint-disable no-console */

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CategoriesContext } from '../../../../components/CategoriesContext/CategoriesContext';
import s from './Categories.module.scss';

export const Categories = () => {
  const categories = useContext(CategoriesContext);

  console.log('Categories render', categories);

  return (
    <div className={s.categories}>
      <h2 className="title">Shop by category</h2>
      {/* Categories content goes here */}
      <div className="categories_content is-flex">
        {categories.map(category => (
          <div key={category.name} className="Category_item has-text-centered">
            <Link
              className={'navbar-item is-flex-direction-column p-0'}
              key={category.name}
              to={`/${category.name.toLowerCase()}`}
            >
              <img
                className={s.category_image}
                src={`${category.src}`}
                alt={category.name}
              />

              <p className="Category_title">{category.longName}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
