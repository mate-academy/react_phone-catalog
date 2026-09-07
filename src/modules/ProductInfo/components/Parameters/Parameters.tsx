import React from 'react';
import styles from './Parameters.module.scss';
import { ProductCard } from '../../../../shared/types/ProductCard';
import classNames from 'classnames';
import { useStorage } from '../../../../context/StorageContext';
import { useTranslation } from 'react-i18next';
import { DataNames } from '../../../../hooks/useProductsStorage';

const aviableColors: Record<string, string> = {
  black: '#1C1C1E',
  green: '#3A7D44',
  yellow: '#F4D03F',
  white: '#F8F9FA',
  purple: '#7D3C98',
  red: '#E74C3C',
  spacegray: '#5E5E5E',
  midnightgreen: '#004953',
  gold: '#D4AF37',
  silver: '#C0C0C0',
  rosegold: '#B76E79',
  coral: '#FF6F61',
  midnight: '#191970',
  spaceblack: '#0B0B0B',
  blue: '#2E86C1',
  pink: '#FFC0CB',
  graphite: '#4B4B4B',
  sierrablue: '#4A90E2',
};

interface Props {
  currentProduct: ProductCard;
  changeColor: (v: string) => void;
  changeCapacity: (v: string) => void;
}

export const Parameters: React.FC<Props> = ({
  currentProduct,
  changeColor,
  changeCapacity,
}) => {
  const { findProduct, removeProduct, addProduct } = useStorage();
  const { t } = useTranslation();

  return (
    <div className={styles.card__parameters}>
      <div className={styles.card__colors}>
        <p className={styles.card__colorsTitle}>{t('inf_colors')}</p>
        <div className={styles.card__buttons}>
          {currentProduct.colorsAvailable.map(
            (currentColor: keyof typeof aviableColors) => {
              return (
                <div
                  key={currentColor}
                  className={classNames(styles.card__color, {
                    [styles['card__color--active']]:
                      currentColor === currentProduct.color,
                  })}
                >
                  <button
                    onClick={() => changeColor(currentColor)}
                    key={currentColor}
                    className={styles.card__colorButton}
                    style={{
                      backgroundColor: aviableColors[currentColor],
                    }}
                  />
                </div>
              );
            },
          )}
        </div>
      </div>

      <div className={styles.card__capacity}>
        <p className={styles.card__capacityTitle}>{t('inf_capacity')}</p>
        <div className={styles.card__buttons}>
          {currentProduct.capacityAvailable.map(cap => {
            return (
              <button
                key={cap}
                className={styles.card__capacityButton}
                style={{
                  backgroundColor:
                    cap === currentProduct.capacity ? 'black' : 'white',
                  color: cap === currentProduct.capacity ? 'white' : 'black',
                }}
                onClick={() => changeCapacity(cap)}
              >
                {cap}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.card__buy}>
        <div className={styles.card__prices}>
          <h2 className={styles.card__price}>
            {`$${currentProduct.priceDiscount}`}
          </h2>

          <h2 className={styles.card__priceFull}>
            {`$${currentProduct.priceRegular}`}
          </h2>
        </div>

        <div className={styles.card__buttons}>
          {!findProduct(DataNames.cart, currentProduct.id) ? (
            <button
              onClick={() => {
                addProduct(DataNames.cart, currentProduct.id);
              }}
              className={styles.card__buyButton}
            >
              {t('art_addCart')}
            </button>
          ) : (
            <button
              onClick={e => {
                e.stopPropagation();
                removeProduct(DataNames.cart, currentProduct.id);
              }}
              className={classNames(
                styles.card__buyButton,
                styles.card__buyButtonActive,
              )}
            >
              {t('art_added')}
            </button>
          )}

          {!findProduct(DataNames.favourites, currentProduct.id) ? (
            <button
              onClick={() =>
                addProduct(DataNames.favourites, currentProduct.id)
              }
              className={styles.card__favourites}
            >
              <img
                src={`${import.meta.env.BASE_URL}/img/icons/favourites.svg`}
              />
            </button>
          ) : (
            <button
              onClick={() =>
                removeProduct(DataNames.favourites, currentProduct.id)
              }
              className={styles.card__favourites}
            >
              <img
                src={`${import.meta.env.BASE_URL}/img/icons/favourites_selected.svg`}
              />
            </button>
          )}
        </div>

        <div className={styles.card__decription}>
          <div className={styles.card__decriptionItem}>
            <p className={styles.card__decriptionName}>{t('inf_screen')}</p>
            <p className={styles.card__decriptionValue}>
              {currentProduct.screen}
            </p>
          </div>
          <div className={styles.card__decriptionItem}>
            <p className={styles.card__decriptionName}>{t('inf_resolution')}</p>
            <p className={styles.card__decriptionValue}>
              {currentProduct.resolution}
            </p>
          </div>
          <div className={styles.card__decriptionItem}>
            <p className={styles.card__decriptionName}>{t('inf_processor')}</p>
            <p className={styles.card__decriptionValue}>
              {currentProduct.processor}
            </p>
          </div>
          <div className={styles.card__decriptionItem}>
            <p className={styles.card__decriptionName}>{t('inf_ram')}</p>
            <p className={styles.card__decriptionValue}>{currentProduct.ram}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
