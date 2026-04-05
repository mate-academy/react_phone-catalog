import React from 'react';
import { Link } from 'react-router-dom';
import { FavouriteIcon } from '../ui/FavouriteIcon';
import { CatalogProducts } from '../../types/Types';
import { HeartFillIcon } from '../ui/HeartFillIcon';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';
import classNames from 'classnames';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: CatalogProducts;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();

  const { name, price, fullPrice, screen, capacity, ram, image } = product;

  const isActiveFavourite = isFavourite(product.id);
  const isAdded = isInCart(product.id);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFavouriteClick = () => {
    toggleFavourite(product);
    scrollToTop();
  };

  const handleCartClick = () => {
    if (!isAdded) {
      addToCart(product);
    }

    scrollToTop();
  };

  const productLink = `/product/${product.id}`;

  const specs = [
    { name: 'Screen', value: screen },
    { name: 'Capacity', value: capacity },
    { name: 'RAM', value: ram },
  ];

  return (
    <article className={styles.productCard}>
      <Link
        to={productLink}
        className={styles.productCard__imageLink}
        onClick={scrollToTop}
      >
        <img src={image} alt={name} className={styles.productCard__image} />
      </Link>
      <h3 className={styles.productCard__title}>
        <Link
          to={productLink}
          className={styles.productCard__titleLink}
          onClick={scrollToTop}
        >
          {name}
        </Link>
      </h3>
      <div className={styles.productCard__priceContainer}>
        <span className={styles.productCard__price}>${price}</span>
        {fullPrice && (
          <span className={styles.productCard__fullPrice}>${fullPrice}</span>
        )}
      </div>
      <hr className={styles.productCard__divider} />
      <div className={styles.productCard__specsContainer}>
        {specs.map(spec => (
          <div key={spec.name} className={styles.productCard__spec}>
            <span className={styles.productCard__specName}>{spec.name}</span>
            <span className={styles.productCard__specValue}>{spec.value}</span>
          </div>
        ))}
      </div>
      <div className={styles.productCard__actions}>
        <button
          type="button"
          className={classNames(styles.productCard__actionAddButton, {
            [styles['productCard__actionAddButton--active']]: isAdded,
          })}
          onClick={handleCartClick}
          disabled={isAdded}
        >
          {isAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>
        <button
          type="button"
          className={styles.productCard__actionFavouriteIcon}
          onClick={handleFavouriteClick}
          aria-label={
            isActiveFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
        >
          {!isActiveFavourite ? (
            <FavouriteIcon className={styles.productCard__icon} />
          ) : (
            <HeartFillIcon className={styles.productCard__icon} />
          )}
        </button>
      </div>
    </article>
  );
};
