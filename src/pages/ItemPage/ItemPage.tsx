import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Listbox } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import * as goodsActions from '../../store/reducers/goodsSlice';

import { Good } from '../../types/Good';
import { canUserBuy } from '../../helpers/canUserBuy';

import { GoodPrice } from '../../components/GoodPrice/GoodPrice';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';
import {
  SecondaryButton,
} from '../../components/Buttons/SecondaryButton/SecondaryButton';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Accordion } from '../../components/Accordion/Accordion';

import './ItemPage.scss';
import './ItemPageDropdown.scss';
import './ItemPageAccordion.scss';

export const ItemPage: React.FC = React.memo(() => {
  const params = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
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
    sizes,
  } = currentGood || {};

  const isUserBuy = useMemo(() => {
    return canUserBuy(sizes, selectedSize);
  }, [selectedSize, sizes]);

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

            {!!sizes?.length && (
              <Dropdown
                rootClassName="itemPage__content-info-size"
                selectedItem={selectedSize}
                setSelectedItem={setSelectedSize}
                placeHolder={t('selectSize')}
              >
                {sizes?.map(size => (
                  <Listbox.Option
                    key={size}
                    value={size}
                    className="itemPage__content-info-size-dropdown-list-item"
                  >
                    {size}
                  </Listbox.Option>
                ))}
              </Dropdown>
            )}

            {goodsToBag
              .some(goodToBag => goodToBag.good.id === currentGood?.id) ? (
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
                    const newGood = {
                      good: currentGood as Good,
                      size: selectedSize as string,
                    };

                    dispatch(goodsActions.addToBag(newGood));
                  }}
                  text={t('buyButtonText')}
                  disabled={!isUserBuy}
                />
              )}

            {goodsToWishlist.some(good => good.id === currentGood?.id) ? (
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

            <Accordion
              rootClassName="itemPage__content-info"
              title={t('description')}
              description={t(`${translationSlug}Description`)}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
