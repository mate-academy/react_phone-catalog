import classNames from 'classnames';
import s from './Categories.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../../../shared/context/ProductsContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Categories = () => {
  const { t } = useTranslation('HomePage');
  const {
    productsPhoneLength,
    productsTabletLength,
    productsAccessoriesLength,
  } = useContext(ProductContext);

  return (
    <div className={classNames(s.categories, 'container', 'block-margin')}>
      <div className={s.categories__title}>
        <h2>{t('Shop by category')}</h2>
      </div>
      <div className={s.category}>
        <Link to={'/phones'} className={s.category__phone}>
          <div className={s.category__phone_img}>
            <img src="./img/category-phones.webp" alt="" />
          </div>
          <div className={s.category__phone_title}>
            <h4>{t('Mobile phones')}</h4>
            <div className={s.category__phone_quantity}>
              {productsPhoneLength} {t('models')}
            </div>
          </div>
        </Link>

        <Link to={'/tablets'} className={s.category__tablets}>
          <div className={s.category__tablets_img}>
            <img src="./img/category-tablets.webp" alt="" />
          </div>
          <div className={s.category__tablets_title}>
            <h4>{t('Tablets')}</h4>
            <div className={s.category__tablets_quantity}>
              {productsTabletLength} {t('models')}
            </div>
          </div>
        </Link>

        <Link to={'/accessories'} className={s.category__accessories}>
          <div className={s.category__accessories_img}>
            <img src="./img/category-accessories.png" alt="" />
          </div>
          <div className={s.category__accessories_title}>
            <h4>{t('Accessories')}</h4>
            <div className={s.category__accessories_quantity}>
              {productsAccessoriesLength} {t('models')}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
