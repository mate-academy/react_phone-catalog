import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { useCart } from '../../../contexts/CartContext';
import { useFavorites } from '../../../contexts/FavoritesContext';
import styles from './ProductCardShared.module.scss';
import favIcon from '/icons/fav-icon.png';
import favActIcon from '/icons/favorite-active-icon.png';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

const normalizeForUrlPart = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[()]/g, '');

export const ProductCardShared: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const navigate = useNavigate();

  const hasDiscount = product.fullPrice > product.price;

  const { cart, addToCart, createCartItemId } = useCart();
  const cartItemId = createCartItemId(product);
  const inCart = cart.some(item => item.cartItemId === cartItemId);

  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(product);

  const handleClickProduct = () => {
    const productId = normalizeForUrlPart(product.itemId);

    navigate(`/${product.category}/${productId}`, {
      state: {
        category: product.category,
        name: product.name,
        showDiscount,
        color: product.color,
        capacity: product.capacity,
      },
    });
  };

  return (
    <>
      <div className={styles.card__prices}>
        <span className={styles.card__price}>${product.price}</span>
        {showDiscount && hasDiscount && (
          <span className={styles.card__fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.card__actions}>
        <button
          type="button"
          className={`${styles.card__addBtn} ${
            inCart ? styles.card__btn__disabled : ''
          }`}
          onClick={() => {
            if (!inCart) {
              addToCart(product);
            }
          }}
          disabled={inCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.card__favBtn} ${
            isFav ? styles['card__favBtn--active'] : ''
          }`}
          onClick={() => toggleFavorite(product, showDiscount)}
        >
          <img
            src={isFav ? favActIcon : favIcon}
            alt={isFav ? 'Added to favorites' : 'Add to favorites'}
            className={styles.card__favBtn__img}
          />
        </button>
      </div>

      <div
        className={styles.card__specs}
        onClick={handleClickProduct}
        role="button"
        tabIndex={0}
      >
        <dl>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>

          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>

          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </dl>
      </div>
    </>
  );
};
