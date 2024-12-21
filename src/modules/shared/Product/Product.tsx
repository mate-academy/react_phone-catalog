import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Product.module.scss';
import { ProductInfo } from '../../../types/ProductInfo';
import { actions as favouritesActions } from '../../../features/favourites/favourites';
import { actions as cartActions } from '../../../features/cart/cart';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Cart } from '../../../features/cart/types/Cart';

type Props = {
  product: ProductInfo;
  hasFullPrice: boolean;
};

export const Product: React.FC<Props> = ({ product, hasFullPrice }) => {
  const dispatch = useAppDispatch();
  const { favourites } = useAppSelector(state => state.favourites);
  const { cart } = useAppSelector(state => state.cart);
  const checkCart = cart.some(g => g.itemId === product.itemId);

  const cartItem: Cart = {
    itemId: product.itemId,
    category: product.category,
    image: product.image,
    quantity: 1,
    name: product.name,
    price: product.price,
  };

  return (
    <article
      className={`product-card ${styles['is-loading']}`}
      data-item-id={product.itemId}
    >
      <Link
        className={styles['product-card__link']}
        to={`../../${product.category}/${product.itemId}`}
      >
        <div className={styles['product-card__image']}>
          <img src={product.image} alt="Product" />
        </div>

        <div className="product-card__content">
          <h4 className={styles['product-card__title']}>{product.name}</h4>

          <div className={styles['product-card__prices']}>
            <p className={styles['product-card__price']}>${product.price}</p>

            {hasFullPrice && (
              <p className={styles['product-card__discount']}>
                ${product.fullPrice}
              </p>
            )}
          </div>

          <ul className={styles['product-card__info']}>
            <li className={styles['product-card__item']}>
              <p className={styles['product-card__subtitle']}>Screen</p>
              <p className={styles['product-card__param']}>6.1” OLED</p>
            </li>

            <li className={styles['product-card__item']}>
              <p className={styles['product-card__subtitle']}>Capacity</p>
              <p className={styles['product-card__param']}>128 GB</p>
            </li>

            <li className={styles['product-card__item']}>
              <p className={styles['product-card__subtitle']}>RAM</p>
              <p className={styles['product-card__param']}>6 GB</p>
            </li>
          </ul>

          <div className={styles['product-card__interact']}>
            <button
              className={cn(styles['product-card__add'], 'button-add', {
                'button-add--added': checkCart,
              })}
              onClick={e => {
                dispatch(cartActions.addToCart(cartItem));
                e.preventDefault();
              }}
              disabled={checkCart}
            >
              {checkCart ? 'Added' : 'Add to cart'}
            </button>

            <button
              className={`${styles['product-card__like']} button-like`}
              onClick={e => {
                dispatch(favouritesActions.toggleFavourite(product));
                e.preventDefault();
              }}
            >
              <span
                className={cn('button-like__icon', {
                  'button-like--liked': favourites.some(
                    g => g.itemId === product.itemId,
                  ),
                })}
              ></span>
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};
