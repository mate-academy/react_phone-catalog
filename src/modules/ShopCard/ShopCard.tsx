import styles from './ShopCard.module.scss';
import heart from './../../images/icons/heart.svg';
import fillHeart from './../../images/icons/heart_filled.svg';
import React, { useState } from 'react';
import { Product } from '../../utils/types/Product';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import { addToCart } from '../../features/cart/cartSlise';
import { scrollTop } from '../../helpers/helpers';
import ContentLoader from 'react-content-loader';
import classNames from 'classnames';

type Props = {
  product: Product;
  isDiscount: boolean;
};

export const ShopCard: React.FC<Props> = ({ product, isDiscount }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    id,
    itemId,
    category,
  } = product;

  const dispatch = useAppDispatch();

  const favoritesItems: Product[] = useAppSelector(state => state.favorites);

  const cartItems = useAppSelector(state => state.cart.items);

  const isFavorite = favoritesItems.find(item => item.id === id);

  const isAdded = cartItems.find(item => item.id === id);

  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <article className={styles.card}>
      {isImageLoading && (
        <div className={styles.card__wrapper} style={{ display: 'none' }}>
          <div className={styles.card__image}>
            <img
              src={image}
              alt="Card Image"
              onLoad={() => setIsImageLoading(false)}
              className={styles.card__picture}
            />
          </div>
        </div>
      )}
      {isImageLoading && (
        <ContentLoader
          viewBox="0 0 340 570"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="89" y="56" rx="3" ry="3" width="179" height="197" />
          <rect x="42" y="291" rx="0" ry="0" width="273" height="50" />
          <rect x="200" y="322" rx="0" ry="0" width="17" height="3" />
          <rect x="40" y="358" rx="0" ry="0" width="80" height="32" />
          <rect x="41" y="420" rx="0" ry="0" width="56" height="18" />
          <rect x="244" y="418" rx="0" ry="0" width="72" height="20" />
          <rect x="40" y="449" rx="0" ry="0" width="77" height="18" />
          <rect x="264" y="448" rx="0" ry="0" width="49" height="15" />
          <rect x="39" y="478" rx="0" ry="0" width="39" height="16" />
          <rect x="280" y="477" rx="0" ry="0" width="32" height="15" />
          <rect x="39" y="507" rx="0" ry="0" width="211" height="54" />
          <rect x="257" y="507" rx="0" ry="0" width="56" height="52" />
        </ContentLoader>
      )}
      <div
        className={classNames(styles.card__wrapper, {
          [styles.card__wrapper_hide]: isImageLoading,
        })}
      >
        <Link
          to={`../${category}/${itemId}`}
          onClick={scrollTop}
          className={styles.card__wrapper}
        >
          <div className={styles.card__image}>
            <img
              src={image}
              alt="Card Image"
              onLoad={() => setIsImageLoading(false)}
              className={styles.card__picture}
            />
          </div>
          <p className={styles.card__description}>{name}</p>
          <div className={styles.card__priceBox}>
            <h3 className={styles.card__original_price}>{price}$</h3>
            {isDiscount && (
              <h3 className={styles.card__sale_price}>{fullPrice}$</h3>
            )}
          </div>
          <div className={styles.card__line}></div>
        </Link>
        <div className={styles.card__details}>
          <div className={styles.card__detailsInfo}>
            <p className={styles.card__detailsInfo_name}>Screen</p>
            <p className={styles.card__detailsInfo_characteristic}>{screen}</p>
          </div>
          <div className={styles.card__detailsInfo}>
            <p className={styles.card__detailsInfo_name}>Capacity</p>
            <p className={styles.card__detailsInfo_characteristic}>
              {capacity}
            </p>
          </div>
          <div className={styles.card__detailsInfo}>
            <p className={styles.card__detailsInfo_name}>RAM</p>
            <p className={styles.card__detailsInfo_characteristic}>{ram}</p>
          </div>
        </div>
        <div className={styles.card__buttons}>
          {isAdded ? (
            <div className={styles.card__success_added}>Added to cart</div>
          ) : (
            <button
              className={styles.card__buttons_card}
              onClick={() => dispatch(addToCart({ quantity: 1, ...product }))}
            >
              Add to cart
            </button>
          )}

          <button
            className={styles.card__buttons_like}
            onClick={() => dispatch(toggleFavorite(product))}
          >
            {isFavorite ? (
              <img src={fillHeart} alt="Red heart" />
            ) : (
              <img src={heart} alt="Heart" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
