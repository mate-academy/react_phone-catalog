/* eslint-disable max-len */
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import * as goodsActions from '../../store/reducers/goodsSlice';

import { convertCurrency, currencies } from '../../helpers/convertCurrency';
import { giveCurrency } from '../../helpers/giveCurrency';

import { GoodPrice } from '../../components/GoodPrice/GoodPrice';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton/SecondaryButton';

import './BagPage.scss';

type Props = {
  setIsBagOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCheckoutModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPayNowButtonClicked: React.Dispatch<React.SetStateAction<boolean>>,
};

export const BagPage: React.FC<Props> = React.memo(({
  setIsBagOpened,
  setIsCheckoutModalOpened,
  setIsPayNowButtonClicked,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  const { goodsToBag } = useAppSelector(state => state.goods);
  const subTotal = goodsToBag.reduce((total, currentItem) => {
    const { price, sale } = currentItem.good;
    const convertedPrice = convertCurrency(
      price,
      sale || 0,
      currencies[currentLanguage as keyof typeof currencies],
    );

    return total + (convertedPrice * currentItem.quantity);
  }, 0);
  const shipping = Math.round(subTotal * 0.2);

  const totalInfo = [
    {
      name: 'subTotal',
      value: subTotal,
    },
    {
      name: 'shipping',
      value: shipping,
    },
    {
      name: 'total',
      value: subTotal + shipping,
    },
  ];

  const handleCheckoutClick = () => {
    setIsBagOpened(false);
    setIsCheckoutModalOpened(true);
  };

  const handlePayNowClick = () => {
    setIsBagOpened(false);
    setIsCheckoutModalOpened(true);
    setIsPayNowButtonClicked(true);
  };

  return (
    <section className="bag">
      {goodsToBag.length ? (
        <div className="bag__container">
          <ul className="bag__goods-list">
            {goodsToBag.map(goodToBag => {
              const {
                translationSlug,
                price,
                sale,
                images,
                id,
                seoUrl,
              } = goodToBag.good;

              return (
                <li
                  className="bag__goods-list-item"
                  key={id}
                >
                  <div
                    className="bag__goods-list-item-image"
                    style={{
                      backgroundImage: `url(${images[0]})`,
                    }}
                  />

                  <div className="bag__goods-list-item-info">
                    <Link
                      className="bag__goods-list-item-link"
                      to={`/${seoUrl}`}
                    >
                      <h2 className="bag__goods-list-item-info-title">
                        {t(translationSlug)}
                      </h2>
                    </Link>

                    <GoodPrice
                      rootClassName="bag"
                      price={price}
                      sale={sale}
                      quantity={goodToBag.quantity}
                    />

                    {goodToBag.size && (
                      <p className="bag__goods-list-item-info-size">
                        {`Size: ${goodToBag.size}`}
                      </p>
                    )}

                    <div className="bag__goods-list-item-info-extra">
                      <div className="bag__goods-list-item-info-extra-quantity">
                        {t('quantity')}

                        <p className="bag__goods-list-item-info-extra-quantity-buttons">
                          <button
                            className="bag__goods-list-item-info-extra-quantity-buttons-button"
                            type="button"
                            onClick={() => {
                              dispatch(goodsActions.decreaseQuantity(id));
                            }}
                          >
                            -
                          </button>
                          {' '}
                          <p className="bag__goods-list-item-info-extra-quantity-value">
                            {goodToBag.quantity}
                          </p>
                          {' '}
                          <button
                            className="bag__goods-list-item-info-extra-quantity-buttons-button"
                            type="button"
                            onClick={() => {
                              dispatch(goodsActions.increaseQuantity(id));
                            }}
                          >
                            +
                          </button>
                        </p>
                      </div>

                      <button
                        className="bag__goods-list-item-info-extra-button"
                        type="button"
                        onClick={() => {
                          dispatch(goodsActions.removeFromBag(id));
                        }}
                      >
                        {t('delete')}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="bag__total">
            {totalInfo.map(item => {
              const { name, value } = item;

              return (
                <div className={`bag__total-${name}`}>
                  <p className={`bag__total-${name}-label`}>
                    {t(name)}
                  </p>

                  <p className={`bag__total-${name}-value`}>
                    {value}
                    {' '}
                    {giveCurrency(currentLanguage)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bag__buttons">
            <MainButton
              className="bag__buttons-button-main"
              button
              onClick={handlePayNowClick}
              text={t('payNow')}
            />

            <SecondaryButton
              className="bag__buttons-button-secondary"
              button
              onClick={handleCheckoutClick}
              text={t('checkout')}
            />
          </div>
        </div>
      ) : (
        <p>
          {t('bagEmpty')}
        </p>
      )}
    </section>
  );
});
