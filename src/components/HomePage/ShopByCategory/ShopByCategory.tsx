import React, { useEffect, useState } from 'react';
import './ShopByCategory.scss';
import { Link } from 'react-router-dom';
import { getAccessories, getPhones, getTablets } from '../../../api/api';
import { Device } from '../../../types/device';
import { useTranslation } from 'react-i18next';

export const ShopByCategory: React.FC = () => {
  const [phones, setPhones] = useState<Device[]>([]);
  const [tablets, setTablets] = useState<Device[]>([]);
  const [accessories, setAccessories] = useState<Device[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getPhones().then(setPhones);
    getTablets().then(setTablets);
    getAccessories().then(setAccessories);
  }, []);

  return (
    <>
      <h2 className="ShopByCategory__title">{t('Shop by category')}</h2>
      <div className="ShopByCategory__categories">
        <Link to="products/phones" className="ShopByCategory__block">
          <div className="ShopByCategory__block--img-block block__phones">
            <div
              className="ShopByCategory__block--img-block--img
             img__phones"
            ></div>
          </div>
          <h4 className="ShopByCategory__block--title">{t('Mobile phones')}</h4>
          <p
            className="ShopByCategory__block--models
           body-text"
          >
            {t('p.models', { length: phones.length })}
          </p>
        </Link>

        <Link to="products/tablets" className="ShopByCategory__block">
          <div className="ShopByCategory__block--img-block block__tablets">
            <div
              className="ShopByCategory__block--img-block--img 
            img__tablets"
            ></div>
          </div>
          <h4 className="ShopByCategory__block--title">{t('Tablets')}</h4>
          <p
            className="ShopByCategory__block--models
           body-text"
          >
            {t('p.models', { length: tablets.length })}
          </p>
        </Link>

        <Link to="products/accessories" className="ShopByCategory__block">
          <div
            className="ShopByCategory__block--img-block 
          block__accessories"
          >
            <div
              className="ShopByCategory__block--img-block--img 
            img__accessories"
            ></div>
          </div>
          <h4 className="ShopByCategory__block--title">{t('Accessories')}</h4>
          <p className="ShopByCategory__block--models body-text">
            {t('p.models', { length: accessories.length })}
          </p>
        </Link>
      </div>
    </>
  );
};
