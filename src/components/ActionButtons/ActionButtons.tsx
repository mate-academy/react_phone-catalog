import React, { useState, useEffect } from 'react';
import styles from './ActionButtons.module.scss';
import favoritesIcon from '../../img/icons/FavoritesIcon.svg';
import favoritesIconDT from '../../img/icons/FavoritesIcon--DarkTheme.svg';
import favoritesIconRed from '../../img/icons/fav-red.svg';
import { useAppContext } from '../../context/AppContext';
import { LimitedProduct } from '../../types/Product';
import { useLocation } from 'react-router-dom';

type ButtonProps = {
  product: LimitedProduct | undefined;
};

export const ActionButtons: React.FC<ButtonProps> = ({ product }) => {
  const location = useLocation();
  const {
    favoriteProducts,
    setFavoriteProducts,
    productsInCart,
    setProductsInCart,
    productsInCartCount,
    setProductsInCartCount,
    theme
  } = useAppContext();
  const [isProductInFavs, setIsProductInFavs] = useState<boolean | undefined>(undefined);
  const [isProductInCart, setIsProductInCart] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const favs = favoriteProducts.find((item: LimitedProduct) => item.id === product?.id);
    setIsProductInFavs(favs !== undefined);
  }, [location, favoriteProducts, product?.id]);

  useEffect(() => {
    const cart = productsInCart.find((item: LimitedProduct) => item.id === product?.id);
    setIsProductInCart(cart !== undefined);
  }, [location, productsInCart, product?.id]);

  const handleFavorites = () => {
    // @ts-ignore
    setFavoriteProducts((favoriteProducts: LimitedProduct[]) => {
      const newFavoriteProducts = [...favoriteProducts];
      const foundIndex = product ? newFavoriteProducts.findIndex(p => p.id === product.id) : -1;

      if (foundIndex === -1 && product) {
        newFavoriteProducts.push(product);
        setIsProductInFavs(true);
      } else if (foundIndex > -1) {
        newFavoriteProducts.splice(foundIndex, 1);
        setIsProductInFavs(false);
      }

      return newFavoriteProducts;
    });
  };

  const handleProductsInCart = () => {
    const newProductsInCart = [...productsInCart];
    const newProductsInCartCount = [...productsInCartCount];

    const foundIndex = product ? newProductsInCart.findIndex(p => p.id === product.id) : -1;

    if (foundIndex === -1 && product) {
      newProductsInCart.push(product);
      newProductsInCartCount.push(1);
      setIsProductInCart(true);
    } else if (foundIndex > -1) {
      newProductsInCart.splice(foundIndex, 1);
      newProductsInCartCount.splice(foundIndex, 1);
      setIsProductInCart(false);
    }

    setProductsInCart(newProductsInCart);
    setProductsInCartCount(newProductsInCartCount);
  };

  return (
    <div className={styles.buttons}>
      <button className={`${isProductInCart ? styles.buttonCardRemove : styles.buttonCardAdd}`} onClick={handleProductsInCart}>
        {isProductInCart ? (
          <p className={styles.buttonTextRemove}>Remove</p>
        ) : (
          <p className={styles.buttonTextAdd}>Add to cart</p>
        )}
      </button>

      <button className={styles.buttonFavorite} onClick={handleFavorites}>
        <img
          className={styles.buttonFavoriteIcon}
          src={`${isProductInFavs ? favoritesIconRed : theme === 'dark' ? favoritesIconDT : favoritesIcon}`}
          alt="favorite"
        />
      </button>
    </div>
  );
};
