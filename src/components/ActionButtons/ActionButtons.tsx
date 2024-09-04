import React, { useState, useEffect } from 'react';
import styles from './ActionButtons.module.scss';
import favoritesIcon from '../../img/icons/fav.svg';
import favoritesIconRed from '../../img/icons/fav-red.svg';
import { useAppContext } from '../../context/AppContext';
import { LimitedProduct} from '../../types/Product';
import { useLocation } from 'react-router-dom';

type ButtonProps = {
  product: LimitedProduct | undefined;
};

export const ActionButtons: React.FC<ButtonProps> = ({product}) => {

  const location = useLocation();
  const { favoriteProducts, setFavoriteProducts, productsInCart, setProductsInCart, productsInCartCount, setProductsInCartCount } = useAppContext();
  const [isProductInFavs, setIsProductInFavs] = useState<boolean | undefined>(undefined);
  const [isProductInCart, setIsProductInCart] = useState<boolean | undefined>(undefined);


  useEffect(() => {
    const favs = favoriteProducts.find((item: LimitedProduct) => item.id === product?.id)
    favs === undefined ? setIsProductInFavs(false) : setIsProductInFavs(true);
  },[location, favoriteProducts])

  useEffect(() => {
    const cart = productsInCart.find((item: LimitedProduct) => item.id === product?.id);
    cart === undefined ? setIsProductInCart(false) : setIsProductInCart(true);
  },[location, productsInCart])


  const handleFavorites = () => {
    // @ts-ignore
    setFavoriteProducts((favoriteProducts: LimitedProduct[]) => {

      const newFavoriteProducts = [...favoriteProducts];
      let foundIndex = -1;

      if(product !== undefined) {
        foundIndex = newFavoriteProducts.findIndex(p => p.id === product.id);
      }


      if (foundIndex === -1 && product !== undefined) {
        newFavoriteProducts.push(product);
        setIsProductInFavs(true)
      } else {
        newFavoriteProducts.splice(foundIndex, 1);
        setIsProductInFavs(false)
      }

      console.log('updated favorites', newFavoriteProducts);
      return newFavoriteProducts;
    });
  };

  const handleProductsInCart = () => {
    let newProductsInCart = [...productsInCart];
    let newProductsInCartCount = [...productsInCartCount];

    let foundIndex = -1;
    if(product !== undefined) {
      foundIndex = newProductsInCart.findIndex(p => p.id === product.id);
    }

    if (foundIndex === -1 && product !== undefined) {
      newProductsInCart.push(product)
      newProductsInCartCount.push(1);
      setIsProductInCart(true)
    }

    if (foundIndex > -1) {
      newProductsInCart.splice(foundIndex,1)
      newProductsInCartCount.splice(foundIndex,1)
      setIsProductInCart(false)
    }

    setProductsInCart(newProductsInCart);
    setProductsInCartCount(newProductsInCartCount);
  }

  return (
    <div className={styles.buttons}>
      <button className={styles.buttonCard} onClick={handleProductsInCart}>
        {isProductInCart && <p className={styles.buttonText}>Remove</p>}
        {!isProductInCart && <p className={styles.buttonText}>Add to cart</p>}
      </button>

      <button className={styles.buttonFavorite} onClick={handleFavorites}>
        <img
          className={styles.buttonFavoriteIcon}
          src={isProductInFavs ? favoritesIconRed : favoritesIcon}
          alt="favorite"
        />
      </button>
    </div>
  );
};
