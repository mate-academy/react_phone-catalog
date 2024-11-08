import React from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { useCart } from '../../hooks/useCart';
import { useFavourite } from '../../hooks/useFavourite';
import { formatSpecText } from '../../utils/formatSpecText';
import { instantScroll } from '../../utils/instantScroll';

interface Props {
  product: Product;
  isDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, isDiscount }) => {
  const [searchParams] = useSearchParams();
  const [isAddedToCart, addToCart] = useCart(product.id, product);
  const { pathname } = useLocation();
  const [isAddedToFavourite, addToFavourite] = useFavourite(
    product.id,
    product,
  );

  const {
    images,
    name,
    screen,
    priceRegular,
    priceDiscount,
    capacity,
    ram,
    id,
    category,
  } = product;

  return (
    <NavLink
      to={`/${category}/${id}`}
      state={{ search: searchParams.toString(), pathname }}
      className={classNames(styles.productCardContainer)}
      onClick={instantScroll}
    >
      <div className={styles.productImgContainer}>
        <img src={images[0]} alt={name} className={styles.productImg} />
      </div>
      <p className={styles.title}>{name}</p>
      <div className={styles.priceContainer}>
        <p className={styles.price}>{'$' + priceRegular}</p>
        {isDiscount && (
          <p className={classNames(styles.price, styles.priceDiscount)}>
            {'$' + priceDiscount}
          </p>
        )}
      </div>

      <span className={styles.line}></span>

      <ul className={styles.productInfo}>
        <li className={styles.productInfoItem}>
          <span>Screen</span>
          <span>{formatSpecText(screen)}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>Capacity</span>
          <span>{formatSpecText(capacity)}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>RAM</span>
          <span>{formatSpecText(ram)}</span>
        </li>
      </ul>

      <div className={styles.btnContainer}>
        <button
          className={classNames('btnCart', {
            btnCartPressed: isAddedToCart,
          })}
          onClick={addToCart}
          // disabled={isAddedToCart}
        >
          {isAddedToCart ? 'In Cart' : 'Add to Cart'}
        </button>
        <button
          className={classNames('buttonFavourite', 'btnFavourite', {
            btnFavouritePressed: isAddedToFavourite,
          })}
          onClick={addToFavourite}
          aria-label="Add to favourite"
        ></button>
      </div>
    </NavLink>
  );
};
