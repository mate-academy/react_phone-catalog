/* eslint-disable import/extensions */
import React from 'react';
import styles from './ProductCard.module.scss';
import '@/styles/main.scss';
import classNames from 'classnames';
import { ProductBrief } from '@/types/ProductBrief';
import { useProducts } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';

interface Props {
  product: ProductBrief;
  link: string;
}

export const ProductCard: React.FC<Props> = ({ product, link }) => {
  const { cart, setCart, favorites, setFavorites } = useProducts();

  const inCart = cart.some(p => p.product.id === product.id);
  const favorited = favorites.some(p => p.id === product.id);

  const toggleCart = () => {
    if (inCart) {
      setCart(cart.filter(item => item.product.id !== product.id));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const toggleFavorite = () => {
    setFavorites(
      favorited
        ? favorites.filter(p => p.id !== product.id)
        : [...favorites, product],
    );
  };

  return (
    <div className={styles.product_card}>
      <div className={styles.product_card__image}>
        <img
          src={product.image}
          alt={product.name}
          className={styles['product_card__image--img']}
        />
      </div>

      <div className={styles.product_card__title}>
        <Link
          to={`${link}`}
          className={classNames(styles.product_card__link, 'text__body')}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles.product_card__price}>
        <h3 className={styles['product_card__price--main']}>
          ${product.price}
        </h3>
        <p
          className={classNames(
            styles['product_card__price--discount'],
            'text_small',
          )}
        >
          ${product.fullPrice}
        </p>
      </div>

      <hr />

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
            {product.screen}
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
            {product.capacity}
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
            {product.ram}
          </p>
        </div>
      </div>

      <div className={styles.product_card__buttons}>
        <button
          className={classNames('button__primary', {
            'button__primary--active': inCart,
          })}
          onClick={toggleCart}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className="button__circle button__circle--favorite"
          onClick={toggleFavorite}
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
