import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import * as goodsActions from '../../store/reducers/goodsSlice';

import { Good } from '../../types/Good';

import { GoodPrice } from '../../components/GoodPrice/GoodPrice';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';
import {
  SecondaryButton,
} from '../../components/Buttons/SecondaryButton/SecondaryButton';

import './ItemPage.scss';

export const ItemPage: React.FC = React.memo(() => {
  const params = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    currentGood,
    goodsToBag,
    goodsToWishlist,
  } = useAppSelector(state => state.goods);

  const {
    images,
    translationSlug,
    price,
    sale,
    id,
    name,
  } = currentGood || {};

  useEffect(() => {
    dispatch(goodsActions.currentGood(params.seoUrl as string));
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

            {goodsToBag.includes(currentGood as Good) ? (
              <SecondaryButton
                className="itemPage__content-info-button-remove"
                button
                onClick={() => {
                  dispatch(goodsActions.removeFromBag(id as number));
                }}
                text={t('buyButtonTextRemove')}
              />
            ) : (
              <MainButton
                className="itemPage__content-info-button-main"
                button
                onClick={() => {
                  dispatch(goodsActions.addToBag(currentGood as Good));
                }}
                text={t('buyButtonText')}
              />
            )}

            {goodsToWishlist.includes(currentGood as Good) ? (
              <button
                className="itemPage__content-info-button-secondary"
                type="button"
                onClick={() => {
                  dispatch(goodsActions.removeFromWishlist(id as number));
                }}
              >
                {t('removeFromWishList')}
              </button>
            ) : (
              <button
                className="itemPage__content-info-button-secondary"
                type="button"
                onClick={() => {
                  dispatch(goodsActions.addToWishList(currentGood as Good));
                }}
              >
                {t('addToWishList')}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
