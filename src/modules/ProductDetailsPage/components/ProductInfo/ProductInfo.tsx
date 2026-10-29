import React, { useContext } from 'react';
import { Product, ProductDetails } from '../../../../types';
import { CartContext } from '../../../../context/CartContext';
import { FavoritesContext } from '../../../../context/FavoritesContext';
import styles from './ProductInfo.module.scss';

type Props = {
  product: ProductDetails;
  cardProduct: Product | null;
};

export const ProductInfo = ({ product, cardProduct }: Props) => {
  const { cart, addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some(fav => fav.itemId === product.id);
  const isInCart = cart.some(item => item.id === product.id);

  return (
    <div>
      <div className={styles.prices}>
        <span className={styles.newPrice}>${product.priceDiscount}</span>
        {product.priceRegular !== product.priceDiscount && (
          <span className={styles.oldPrice}>${product.priceRegular}</span>
        )}
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={
            isInCart ? `${styles.addButton} ${styles.added}` : styles.addButton
          }
          onClick={() => {
            if (cardProduct) {
              addToCart(cardProduct);
            }
          }}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={styles.favButton}
          onClick={() => {
            if (cardProduct) {
              toggleFavorite(cardProduct);
            }
          }}
        >
          <img
            src={isFavorite ? 'icons/filled-heart.svg' : 'icons/heaer.svg'}
            alt="add to fav"
          />
        </button>
      </div>

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>
        <div className={styles.spec}>
          <dt>Resolution</dt>
          <dd>{product.resolution}</dd>
        </div>
        <div className={styles.spec}>
          <dt>Processor</dt>
          <dd>{product.processor}</dd>
        </div>
        <div className={styles.spec}>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>
    </div>
  );
};
