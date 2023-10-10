import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Good } from '../../types/Good';
import { getData } from '../../helpers/httpClient';

import { GoodPrice } from '../../components/GoodPrice/GoodPrice';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';

import './ItemPage.scss';

export const ItemPage: React.FC = React.memo(() => {
  const params = useParams();
  const { t } = useTranslation();

  const [currentGood, setCurrentGood] = useState<Good | null>(null);
  const {
    images,
    translationSlug,
    price,
    sale,
    id,
    name,
  } = currentGood || {};

  useEffect(() => {
    getData<Good[]>('goods')
      .then(goods => setCurrentGood(
        goods.find(good => good.seoUrl === params.seoUrl) as Good,
      ));
  }, []);

  return (
    <section className="itemPage page__section">
      <div className="container">
        <div className="itemPage__content">
          <ul className="itemPage__content-images-list">
            {images?.map(image => (
              <li
                key={image}
                className="itemPage__content-images-list-item"
              >
                <img
                  className="itemPage__content-images-list-item-image"
                  src={image}
                  alt={name}
                />
              </li>
            ))}
          </ul>

          <div className="itemPage__content-info">
            <h2 className="itemPage__content-info-title">
              {t(translationSlug as string)}
            </h2>

            <GoodPrice
              rootClassName="itemPage"
              sale={sale}
              price={price}
            />

            <p className="itemPage__content-info-id">
              {`${t('productCode')}: ${id}`}
            </p>

            <MainButton
              className="itemPage__content-info-button-main"
              button
              onClick={() => {}}
              text={t('buyButtonText')}
            />

            <button
              className="itemPage__content-info-button-secondary"
              type="button"
              onClick={() => {}}
            >
              {t('addToWishList')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
