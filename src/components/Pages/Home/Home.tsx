import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../text.scss';
import './Home.scss';
import { NavLink, useSearchParams } from 'react-router-dom';

import phones from '../../../img/categories/phones.png';
import tablets from '../../../img/categories/tablets.png';
import accessories from '../../../img/categories/accessories.png';
import { SliderPictures } from './SliderPictures/SliderPictures';
import { SliderDevices } from './SliderDevices/SliderDevices';
import listProduct from '../../../api/products.json';

export const Home = () => {
  const listNewProducts = listProduct.filter(product => product.year === 2022);
  const maxPrice = Math.max(...listProduct.map(product => product.price));
  const listHotProducts = listProduct.filter(
    product => product.price >= maxPrice * 0.7,
  );

  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  return (
    <div className="home">
      <h1 className="text--h1 home__title">{t('title')}</h1>
      <div className="content">
        <SliderPictures />

        <SliderDevices
          listProduct={listNewProducts}
          title={t('titleSection.0')}
        />

        <div className="category">
          <h2 className="text--h2">{t('titleSection.1')}</h2>

          <div className="category__content">
            <NavLink className="category__card" to="/phones">
              <img className="category__photo" src={phones} alt="phones" />
              <span className="text--h4 category__title">
                {t('pageName.1')}
              </span>
              <span className="text--body category__info">
                95 {t('models')}
              </span>
            </NavLink>

            <NavLink className="category__card" to="/tablets">
              <img className="category__photo" src={tablets} alt="tablets" />
              <span className="text--h4 category__title">
                {t('pageName.2')}
              </span>
              <span className="text--body category__info">
                24 {t('models')}
              </span>
            </NavLink>

            <NavLink className="category__card" to="/accessories">
              <img
                className="category__photo"
                src={accessories}
                alt="accessories"
              />
              <span className="text--h4 category__title">
                {t('pageName.3')}
              </span>
              <span className="text--body category__info">
                100 {t('models')}
              </span>
            </NavLink>
          </div>
        </div>

        <SliderDevices
          listProduct={listHotProducts}
          title={t('titleSection.2')}
        />
      </div>
    </div>
  );
};
