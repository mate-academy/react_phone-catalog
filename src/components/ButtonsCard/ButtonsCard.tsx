import React from 'react';
import styles from '../ButtonsCard/ButtonsCardStyles.module.scss';
import { Product } from '../../types/ProductTypes';
import { Phone } from '../../types/PhoneTypes';
import { Tablet } from '../../types/TabletType';
import { Accessory } from '../../types/AccessorieTypes';
import { useFavorites } from '../../utils/FavoritePageContext';
import { useCart } from '../../utils/CartContext';

type Props = {
  isExtended?: boolean;
  isExtendedPage?: boolean;
  product?: Product | Phone | Tablet | Accessory;
};

export const ButtonsCard: React.FC<Props> = ({ isExtended, isExtendedPage, product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();

  const handleFavoriteClick = () => {
    if (!product) return;

    let productId: string;
    if (typeof product.id === 'number') {
      productId = (product as Product).itemId;
    } else {
      productId = product.id;
    }

    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(product);
    }
  };

  const handleCartClick = () => {
    if (!product) return;

    const productId = getProductId();
    if (!isInCart(productId)) {
      addToCart(product);
    }
  };

  const getProductId = (): string => {
    if (!product) return '';
    if (typeof product.id === 'number') {
      return (product as Product).itemId;
    }
    return product.id;
  };

  const productId = getProductId();
  const isInFavorites = productId ? isFavorite(productId) : false;
  const isProductInCart = productId ? isInCart(productId) : false;

  return (
    <div className={styles.styles_for_butt}>
      <button
        className={
          isProductInCart
            ? styles.cartButtonActive
            : isExtended
              ? styles.extendedCardButton
              : isExtendedPage
                ? styles.extendedPageButton
                : styles.add_to_cart
        }
        onClick={handleCartClick}
        disabled={isProductInCart}
      >
        {isProductInCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        className={isExtendedPage ? styles.extendedPageFavButton : styles.love_butt}
        onClick={handleFavoriteClick}
      >
        <img
          src={isInFavorites ? '/img/icons/love-it-active.jpg' : '/img/icons/love-it.svg'}
          alt="to favorite"
          className={styles.favorite_product}
        />
      </button>
    </div>
  );
};
