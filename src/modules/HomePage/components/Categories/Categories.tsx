import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { CategoriesContext } from '../../../../Context/CategoriesContext';
import { ProductsContext } from '../../../../Context/ProductsContext';

import s from './Categories.module.scss';
import { asset } from '../../../../hooks/utils';

export const Categories = () => {
  const categories = useContext(CategoriesContext);
  const { products } = useContextSelector(ProductsContext, ctx => ctx);

  function totalItemsCheck(category: string) {
    return products.filter(prod => prod.category === category).length;
  }

  return (
    <div className={s.categories}>
      <h2 className={`title ${s.categories_title}`}>Shop by category</h2>
      <div className={`is-flex ${s.categories_content__container}`}>
        {categories.map((category, idx) => (
          <Link
            className={`is-flex is-flex-direction-column ${s.small_img}`}
            key={category.name}
            to={`/${category.name.toLowerCase()}`}
          >
            <figure
              className={`image ${s.small_img__figure} ${s[`box_${idx}`]}`}
            >
              <img src={asset(category.src)} alt={category.name} />
            </figure>

            <p className={`${s.category_title}`}>{category.longName}</p>
            <span className={`${s.category_quantity}`}>
              {totalItemsCheck(category.slug)} models
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
