import { useContext } from 'react';
import category from './Categories.module.scss';
import { CatalogContext } from '../CatalogProvider';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const { phones, tablets, accessories } = useContext(CatalogContext);

  return (
    <div className={category.categories}>
      <div className={category.categories__header}>Shop by category</div>
      <div className={category.categories__content}>
        <div className={category.categories__option}>
          <Link to="/phones" className={category.categories__link}>
            <img
              src="img/category-phones.png"
              alt="phones"
              className={category.categories__image}
            />
          </Link>
          <h2 className={category.categories__title}>Phones</h2>
          <span className={category.categories__amount}>
            {phones.length} models
          </span>
        </div>
        <div className={category.categories__option}>
          <Link to="/tablets" className={category.categories__link}>
            <img
              src="img/category-tablets.png"
              alt="tablets"
              className={category.categories__image}
            />
          </Link>
          <h2 className={category.categories__title}>Tablets</h2>
          <span className={category.categories__amount}>
            {tablets.length} models
          </span>
        </div>
        <div className={category.categories__option}>
          <Link to="/accessories" className={category.categories__link}>
            <img
              src="img/category-accessories.png"
              alt="accessories"
              className={category.categories__image}
            />
          </Link>
          <h2 className={category.categories__title}>Accessories</h2>
          <span className={category.categories__amount}>
            {accessories.length} models
          </span>
        </div>
      </div>
    </div>
  );
};
