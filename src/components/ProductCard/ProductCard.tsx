/* eslint-disable max-len */
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import heartIcon from '../../assets/icons/heart-icon.svg';
import likeIcon from '../../assets/icons/like-button.svg';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types/Product';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

const FAVORITE_ANIMATION_DURATION = 700;

export const ProductCard = ({ product }: Props) => {
  const { addToCart, toggleFavorite, isInCart, isFavorite } = useShop();

  const [isFavoritePopping, setIsFavoritePopping] = useState(false);

  const favoriteAnimationTimeoutRef = useRef<number | null>(null);

  const { name, price, fullPrice, screen, capacity, ram, image, itemId } =
    product;

  const productLink = `/product/${itemId}`;

  const added = isInCart(itemId);
  const favorite = isFavorite(itemId);

  useEffect(() => {
    return () => {
      if (favoriteAnimationTimeoutRef.current !== null) {
        window.clearTimeout(favoriteAnimationTimeoutRef.current);
      }
    };
  }, []);

  const startFavoriteAnimation = () => {
    if (favoriteAnimationTimeoutRef.current !== null) {
      window.clearTimeout(favoriteAnimationTimeoutRef.current);
    }

    setIsFavoritePopping(false);

    window.requestAnimationFrame(() => {
      setIsFavoritePopping(true);
    });

    favoriteAnimationTimeoutRef.current = window.setTimeout(() => {
      setIsFavoritePopping(false);
      favoriteAnimationTimeoutRef.current = null;
    }, FAVORITE_ANIMATION_DURATION);
  };

  const handleFavoriteClick = () => {
    if (!favorite) {
      startFavoriteAnimation();
    }

    toggleFavorite(product);
  };

  const handleCartClick = () => {
    addToCart(product);
  };

  return (
    <article className={styles.card}>
      <Link to={productLink} className={styles.imageLink}>
        <img
          src={image}
          alt={name}
          className={classNames(styles.image, {
            [styles.imageScaled]:
              image.includes('apple-iphone-14-pro') ||
              image.includes('apple-iphone-14') ||
              image.includes('apple-iphone-15') ||
              image.includes('apple-iphone-15-pro') ||
              image.includes('apple-iphone-15-plus') ||
              image.includes('apple-iphone-15-pro-max'),
          })}
        />
      </Link>

      <Link to={productLink} className={styles.title}>
        {name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>

        {fullPrice > price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt>Screen</dt>
          <dd>{screen}</dd>
        </div>

        <div className={styles.spec}>
          <dt>Capacity</dt>
          <dd>{capacity}</dd>
        </div>

        <div className={styles.spec}>
          <dt>RAM</dt>
          <dd>{ram}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button
          type="button"
          className={classNames(styles.cartButton, {
            [styles.cartButtonAdded]: added,
          })}
          onClick={handleCartClick}
        >
          {added ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(styles.favoriteButton, {
            [styles.favoriteButtonActive]: favorite,
            [styles.favoriteButtonPop]: isFavoritePopping,
          })}
          onClick={handleFavoriteClick}
          aria-label={
            favorite
              ? `Remove ${name} from favorites`
              : `Add ${name} to favorites`
          }
        >
          <img
            src={favorite ? likeIcon : heartIcon}
            alt=""
            aria-hidden="true"
            className={styles.favoriteIcon}
          />

          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className={styles.favoriteBurst}
          >
            <path d="M8 13.22 2.42 7.64A3.31 3.31 0 0 1 7.1 2.96L8 3.86l.9-.9a3.31 3.31 0 0 1 4.68 4.68L8 13.22Z" />
          </svg>
        </button>
      </div>
    </article>
  );
};
