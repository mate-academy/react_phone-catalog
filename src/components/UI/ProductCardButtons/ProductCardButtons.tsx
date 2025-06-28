import React from 'react';
import styles from './ProductCardButtons.module.scss';
import FavouritesIcon from '@/assets/icons/FavouritesIcon.svg?react';
import FavouritesIconFilled from '@/assets/icons/FavouritesIconFilled.svg?react';
import { useFavorites } from '@/context/FavoritesContext';
import { Product } from '@/types/product';
import cn from 'classnames';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-toastify';

type Props = {
  product: Product;
};

export const ProductCardButtons: React.FC<Props> = ({ product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart, removeFromCart, isCart } = useCart();

  //#region for favotite
  const isProductFavorite = isFavorite(product.itemId);

  const handleFavoriteToggle = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.itemId);
      toast.warn(`"${product.name}" removed from favorites.`);
    } else {
      addToFavorites(product);
      toast.success(`"${product.name}" added to favorites!`);
    }
  };
  //#endregion

  //#region for cart
  const isProductCart = isCart(product.itemId);

  const handleCartToggle = () => {
    if (isProductCart) {
      removeFromCart(product.itemId);
      toast.warn(`"${product.name}" removed from cart.`);
    } else {
      addToCart(product);
      toast.success(`"${product.name}" added to cart!`);
    }
  };

  //#endregion

  return (
    <div className={styles.productButtons}>
      <button
        className={cn(styles.productCartBtn, {
          [styles.productCartBtnActive]: isProductCart,
        })}
        onClick={handleCartToggle}
        aria-label="Add to cart"
      >
        <span className={styles.productCartSpan}>
          {!isProductCart ? 'Add to cart' : 'Added to cart'}
        </span>
      </button>
      <button
        className={cn(styles.productFavoriteBtn, {
          [styles.productFavoriteBtnActive]: isProductFavorite,
        })}
        onClick={handleFavoriteToggle}
        aria-label="Add to favorites"
      >
        {isProductFavorite ? (
          <FavouritesIconFilled className={styles.productFavoriteIcon} />
        ) : (
          <FavouritesIcon className={styles.productFavoriteIcon} />
        )}
      </button>
    </div>
  );
};
