import React, { memo, useCallback } from 'react';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductType } from 'models/product.model';
import { useProducts } from 'src/context/ProductsContext';

const favoriteIcons = '/react_phone-catalog/img/icons/';

type ProductCardProps = {
  product: ProductType;
  showDiscount?: boolean;
};

type ProductCardViewProps = {
  product: ProductType;
  isAdded: boolean;
  isFavorite: boolean;
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddToFavorites: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onNavigate: () => void;
  showDiscount?: boolean;
};

const ProductCardView: React.FC<ProductCardViewProps> = memo(
  ({
    product,
    isAdded,
    isFavorite,
    onAddToCart,
    onAddToFavorites,
    onNavigate,
    showDiscount,
  }) => {
    return (
      <div className={styles.productcard} onClick={onNavigate}>
        <img
          className={styles.productcard__img}
          src={'/react_phone-catalog/' + product.image}
          alt=""
        />
        <h3 className={styles.productcard__title}>{product.name}</h3>
        <div className={styles.productcard__price}>
          {showDiscount && product.fullPrice !== product.price ? (
            <>
              <h2 className={styles.productcard__price_discount}>
                ${product.price}
              </h2>
              <h2 className={styles.productcard__price_full}>
                ${product.fullPrice}
              </h2>
            </>
          ) : (
            <h2 className={styles.productcard__price_discount}>
              ${product.fullPrice}
            </h2>
          )}
        </div>
        <div className={styles.productcard__info}>
          <div className={styles.productcard__info_row}>
            <span className={styles.productcard__info_label}>Screen</span>
            <span className={styles.productcard__info_value}>
              {product.screen}
            </span>
          </div>

          <div className={styles.productcard__info_row}>
            <span className={styles.productcard__info_label}>Capacity</span>
            <span className={styles.productcard__info_value}>
              {product.capacity}
            </span>
          </div>

          <div className={styles.productcard__info_row}>
            <span className={styles.productcard__info_label}>RAM</span>
            <span className={styles.productcard__info_value}>
              {product.ram}
            </span>
          </div>
        </div>
        <div className={styles.productcard__buttons}>
          <button
            className={`${styles.productcard__buttons_cart} ${
              isAdded ? styles['productcard__buttons_cart_is-active'] : ''
            }`}
            onClick={onAddToCart}
          >
            {isAdded ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className={`${styles.productcard__buttons_like} ${
              isFavorite ? styles['productcard__buttons_like_is-active'] : ''
            }`}
            onClick={onAddToFavorites}
          >
            {isFavorite ? (
              <img
                src={favoriteIcons + 'icon-favourites-heart-like-filled.png'}
                alt=""
                className={styles.productcard__buttons_like__img_filled}
              />
            ) : (
              <img
                src={favoriteIcons + 'icon-favourites-heart-like.png'}
                alt=""
                className={styles.productcard__buttons_like__img}
              />
            )}
          </button>
        </div>
      </div>
    );
  },
);

ProductCardView.displayName = 'ProductCardView';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showDiscount = true,
}) => {
  const { cart, favorites, toggleCart, toggleFav } = useProducts();
  const navigate = useNavigate();

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      toggleCart(product);
    },
    [product, toggleCart],
  );

  const handleAddToFavorites = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      toggleFav(product);
    },
    [product, toggleFav],
  );

  const handleNavigate = useCallback(() => {
    navigate(`/${product.category}/product/${product.id}`);
  }, [navigate, product.category, product.id]);

  const productStandardId = product.itemId || String(product.id);
  const isAdded = cart.some(
    // eslint-disable-next-line max-len
    item =>
      (item.product.itemId || String(item.product.id)) === productStandardId,
  );
  const isFavorite = favorites.some(
    item => (item.itemId || String(item.id)) === productStandardId,
  );

  return (
    <ProductCardView
      product={product}
      isAdded={isAdded}
      isFavorite={isFavorite}
      onAddToCart={handleAddToCart}
      onAddToFavorites={handleAddToFavorites}
      onNavigate={handleNavigate}
      showDiscount={showDiscount}
    />
  );
};
