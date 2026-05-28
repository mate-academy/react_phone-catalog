/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { ProductCardData } from '../../types/product.types';
import type { RootState } from '../../store/store';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';

import styles from './ProductCard.module.scss';
import FavoritesHurt from '/img/FavoritesHurt.png';
import FavoritesHurtActive from '../../UI/Buttons/Icons/FavoritesHurtActive.svg';
import { addToCart, removeFromCart } from '../../store/slices/cartSlice';

type ProductCardProps = {
  product: ProductCardData;
  hotPrice?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hotPrice = false,
}) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const favorite = { itemId: product.itemId, category: product.category };

    if (favorites.find(item => item.itemId === product.itemId)) {
      dispatch(removeFavorite(product.itemId));
    } else {
      dispatch(addFavorite(favorite));
    }

    e.stopPropagation();
  };

  const handleAddToCart = () => {
    if (cart.find(item => item.itemId === product.itemId)) {
      dispatch(removeFromCart(product.itemId));
    } else {
      dispatch(
        addToCart({
          itemId: product.itemId,
          image: product.image,
          category: product.category,
          name: product.name,
          price: product.fullPrice,
          quantity: 1,
        }),
      );
    }
  };

  return (
    <Link
      to={`/product/${product.category}/${product.itemId}`}
      className={styles.card}
    >
      <img
        src={`${import.meta.env.BASE_URL}${product.image}`}
        alt={`${product.name}`}
        className={styles.card__img}
      />

      <h3 className={styles.card__title}>{product.name}</h3>

      <p className={styles.card__price}>
        <span className={styles.card__price_newPrice}>
          ${product.price.toLocaleString()}
        </span>

        {hotPrice && (
          <span className={styles.card__price_oldPrice}>
            ${product.fullPrice.toLocaleString()}
          </span>
        )}
      </p>

      <span className={styles.card__line}></span>

      <div className={styles.card__specs}>
        <div className={styles.card__specRow}>
          <span className={styles.card__specRow_label}>Screen:</span>
          <span>{product.screen}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specRow_label}>Capacity:</span>
          <span>{product.capacity}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specRow_label}>RAM:</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className={styles.card__btn}>
        <button
          className={`
            ${styles.card__btn_cart}
            ${styles.card__btn_primary}
            ${cart.find(item => item.itemId === product.itemId) ? styles.card__btn_cart_included : ''}
          `}
          type="button"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          {cart.find(item => item.itemId === product.itemId)
            ? 'Added to cart'
            : 'Add to cart'}
        </button>

        <button
          className={styles.card__btn_fav + ' ' + styles.card__btn_secondary}
          type="button"
          data-cy="favorite"
          onClick={e => {
            handleAddFavorite(e);
          }}
        >
          {favorites.some(item => item.itemId === product.itemId) ? (
            <img
              src={FavoritesHurtActive}
              alt="favorite"
              className={styles.card__btn_fav_img}
            />
          ) : (
            <img
              src={FavoritesHurt}
              alt="favorite"
              className={styles.card__btn_fav_img}
            />
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
