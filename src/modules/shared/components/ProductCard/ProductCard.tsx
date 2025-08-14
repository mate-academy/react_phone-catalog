import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import '@/styles/button.scss';
import '@/styles/typography.scss';
import classNames from 'classnames';

export const ProductCard: React.FC = () => {
  const [inCart, setInCart] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);

  return (
    <div className={styles.product_card}>
      <div className={styles.product_card__image}>
        <img
          src="/img/phones/apple-iphone-xs/spacegray/00.webp"
          alt="Apple iPhone XS Space Gray"
          className={styles['product_card__image--img']}
        />
      </div>

      <div className={styles.product_card__title}>
        <p className="text__body">
          Apple iPhone Xs 64GB Space Gray (iMT9G2FS/A)
        </p>
      </div>

      <div className={styles.product_card__price}>
        <h3 className={styles['product_card__price--main']}>$799</h3>
        <p
          className={classNames(
            styles['product_card__price--discount'],
            'text_small',
          )}
        >
          $899
        </p>
      </div>

      <hr className={styles.product_card__separator} />

      <div className={styles.product_card__specs}>
        <div className={styles['product_card__specs--spec']}>
          <p
            className={classNames(
              styles['product_card__specs--type'],
              'text__small',
            )}
          >
            Screen
          </p>
          <p
            className={classNames(
              styles['product_card__specs--value'],
              'text__small',
            )}
          >
            5.8&quot; OLED
          </p>
        </div>
        <div className={styles['product_card__specs--spec']}>
          <p
            className={classNames(
              styles['product_card__specs--type'],
              'text__small',
            )}
          >
            Capacity
          </p>
          <p
            className={classNames(
              styles['product_card__specs--value'],
              'text__small',
            )}
          >
            64 GB
          </p>
        </div>
        <div className={styles['product_card__specs--spec']}>
          <p
            className={classNames(
              styles['product_card__specs--type'],
              'text__small',
            )}
          >
            RAM
          </p>
          <p
            className={classNames(
              styles['product_card__specs--value'],
              'text__small',
            )}
          >
            4 GB
          </p>
        </div>
      </div>

      <div className={styles.product_card__buttons}>
        <button
          className={classNames('button__primary', {
            'button__primary--active': inCart,
          })}
          onClick={() => setInCart(!inCart)}
        >
          {inCart ? 'Added' : 'Add to card'}
        </button>
        <button
          className="button__circle button__circle--favorite"
          onClick={() => setFavorited(!favorited)}
        >
          <i
            className={classNames('icon', {
              'icon--heart-empty': !favorited,
              'icon--heart-filled': favorited,
            })}
          ></i>
        </button>
      </div>
    </div>
  );
};
