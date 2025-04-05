import classNames from 'classnames';
import s from './Categories.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../../../shared/context/ProductsContext';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const {
    productsPhoneLength,
    productsTabletLength,
    productsAccessoriesLength,
  } = useContext(ProductContext);

  return (
    <div className={classNames(s.categories, 'container', 'block-margin')}>
      <div className={s.categories__title}>
        <h2>Shop by category</h2>
      </div>
      <div className={s.category}>
        <Link to={'/phones'} className={s.category__phone}>
          <div className={s.category__phone_img}>
            <img src="./img/category-phones.webp" alt="" />
          </div>
          <div className={s.category__phone_title}>
            <h4>Mobile phones</h4>
            <div className={s.category__phone_quantity}>
              {productsPhoneLength} models
            </div>
          </div>
        </Link>

        <Link to={'/tablets'} className={s.category__tablets}>
          <div className={s.category__tablets_img}>
            <img src="./img/category-tablets.webp" alt="" />
          </div>
          <div className={s.category__tablets_title}>
            <h4>Tablets</h4>
            <div className={s.category__tablets_quantity}>
              {productsTabletLength} models
            </div>
          </div>
        </Link>

        <Link to={'/accessories'} className={s.category__accessories}>
          <div className={s.category__accessories_img}>
            <img src="./img/category-accessories.png" alt="" />
          </div>
          <div className={s.category__accessories_title}>
            <h4>Accessories</h4>
            <div className={s.category__accessories_quantity}>
              {productsAccessoriesLength} models
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
