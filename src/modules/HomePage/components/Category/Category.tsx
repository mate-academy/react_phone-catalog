import { NavLink } from 'react-router-dom';
import style from './Category.module.scss';
import {
  CATEGORY_LABELS,
  PRODUCT_CATEGORIES,
} from '../../../../constants/categories/categories';
import { useProductsContext } from '../../../../store/ProductsContext';
import { scrollToTop } from '../../../../utils/helpers/helpers';

export const Category = () => {
  const { products } = useProductsContext();

  return (
    <section className={style.category}>
      <h2 className={style.category__title}>Shop by category</h2>
      <div className={style.category__grid}>
        {PRODUCT_CATEGORIES.map(category => (
          <NavLink
            to={category}
            className={style.category__card}
            key={category}
            onClick={scrollToTop}
          >
            <img
              src={`/img/${category}.png`}
              alt={category}
              className={style.category__img}
            />
            <div className={style.category__info}>
              <p className={style.category__bigText}>
                {CATEGORY_LABELS[category]}
              </p>
              <p className={style.category__smallText}>
                {`${products.filter(p => p.category === category).length} models`}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};
