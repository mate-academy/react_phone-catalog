/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import { useProducts } from '../../shared/context/ProductsContext';
import style from './Categories.module.scss';
import { useTranslation } from 'react-i18next';

export const Categories = () => {
  const { phones, tablets, accessories } = useProducts();
  const { t } = useTranslation();

  return (
    <>
      <h2 className={style.title}>{t('shopByCategory')}</h2>
      <div className={style.categories}>
        <div className={style.category}>
          <Link to="/phones">
            <img
              src="./img/mobile-phones-category.png"
              className={style.category__image}
            />
          </Link>
          <p className={style.category__name}>
            {t('categories.mobile phones')}
          </p>
          <p className={style.category__quantity}>
            {phones.length} {t('models')}
          </p>
        </div>

        <div className={style.category}>
          <Link to="/tablets">
            <img
              src="./img/tablets-category.png"
              className={style.category__image}
            />
          </Link>
          <p className={style.category__name}>{t('categories.tablets')}</p>
          <p className={style.category__quantity}>
            {tablets.length} {t('models')}
          </p>
        </div>

        <div className={style.category}>
          <Link to="/accessories">
            <img
              src="./img/accessories-category.png"
              className={style.category__image}
            />
          </Link>
          <p className={style.category__name}>{t('categories.accessories')}</p>
          <p className={style.category__quantity}>
            {accessories.length} {t('models')}
          </p>
        </div>
      </div>
    </>
  );
};
