/* eslint-disable max-len */
/* eslint-disable no-console */

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CategoriesContext } from '../../../../Context/CategoriesContext';
import s from './Categories.module.scss';
import { ProductsContext } from '../../../../Context/ProductsContext';
import { useContextSelector } from 'use-context-selector';

export const Categories = () => {
  const categories = useContext(CategoriesContext);
  const { products } = useContextSelector(ProductsContext, ctx => ctx);

  function totalItemsCheck(category: string) {
    return products.filter(prod => prod.category === category).length;
  }

  return (
    <div className={s.categories}>
      <h2 className="title">Shop by category</h2>
      <div className="categories_content is-flex">
        {categories.map((category, idx) => (
          <div key={category.name} className="category_item mr-4">
            <Link
              className={`is-flex is-flex-direction-column ${s.small_img}`}
              key={category.name}
              to={`/${category.name.toLowerCase()}`}
            >
              <figure
                className={`image ${s.small_img__figure} ${s[`box_${idx}`]}`}
              >
                <img src={`${category.src}`} alt={category.name} />
              </figure>

              <p className={`${s.category_title}`}>{category.longName}</p>
              <span className={`${s.category_quantity}`}>
                {totalItemsCheck(category.slug)} models
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
