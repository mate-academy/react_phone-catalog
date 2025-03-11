import classNames from 'classnames';
import s from './Categories.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../../shared/context/ProductsContext';

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
        <div className={s.category__phone}>
          <div className={s.category__phone_img}>
            <img src="./img/category-phones.webp" alt="" />
          </div>
          <div className={s.category__phone_title}>
            <h4>Mobile phones</h4>
            <div className={s.category__phone_quantity}>
              {productsPhoneLength} models
            </div>
          </div>
        </div>

        <div className={s.category__tablets}>
          <div className={s.category__tablets_img}>
            <img src="public/img/category-tablets.webp" alt="" />
          </div>
          <div className={s.category__tablets_title}>
            <h4>Tablets</h4>
            <div className={s.category__tablets_quantity}>
              {productsTabletLength} models
            </div>
          </div>
        </div>

        <div className={s.category__accessories}>
          <div className={s.category__accessories_img}>
            <img src="public/img/category-accessories.png" alt="" />
          </div>
          <div className={s.category__accessories_title}>
            <h4>Accessories</h4>
            <div className={s.category__accessories_quantity}>
              {productsAccessoriesLength} models
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
