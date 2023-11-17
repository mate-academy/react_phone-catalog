import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as goodsActions from '../../store/reducers/goodsSlice';

import { GoodPrice } from '../../components/GoodPrice/GoodPrice';

import './WishlistPage.scss';

export const WishlistPage: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { goodsToWishlist } = useAppSelector(state => state.goods);

  return (
    <section className="wishlist">
      {goodsToWishlist.length ? (
        goodsToWishlist.map(good => {
          const {
            images,
            translationSlug,
            price,
            sale,
            id,
            seoUrl,
          } = good;

          return (
            <Link
              className="wishlist__good-card"
              key={id}
              to={`/${seoUrl}`}
            >
              <img
                className="wishlist__good-card-image"
                src={images[0]}
                alt={translationSlug}
              />

              <div className="wishlist__good-card-info">
                <h2 className="wishlist__good-card-info-title">
                  {t(translationSlug)}
                </h2>

                <GoodPrice
                  rootClassName="wishlist"
                  price={price}
                  sale={sale}
                />

                <button
                  className="wishlist__good-card-info-button"
                  type="button"
                  onClick={() => {
                    dispatch(goodsActions.removeFromWishlist(id));
                  }}
                >
                  {t('delete')}
                </button>
              </div>
            </Link>
          );
        })
      ) : (
        <p>
          {t('wishlistEmpty')}
        </p>
      )}
    </section>
  );
});
