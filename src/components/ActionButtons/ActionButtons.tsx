import React from 'react';
import styles from './ActionButtons.module.scss';
import favoritesIcon from '../../img/icons/fav.svg';
import { useAppContext } from '../../context/AppContext';
import { Product} from '../../types/Product';

type ButtonProps = {
  product: Product;
  // handleSelectedProduct: (newState: string) => "";
};

export const ActionButtons: React.FC<ButtonProps> = ({product}) => {
  const isProductInCart = true; // DELETE LATER
  const { favoriteProducts, setFavoriteProducts, productsInCart, setProductsInCart} = useAppContext();



  const handleFavorites = () => {
    let newFavoriteProducts = [...favoriteProducts];
    const foundIndex = newFavoriteProducts.indexOf(product);

    if (foundIndex === -1) {
      newFavoriteProducts.push(product)
      console.log('added to favs')
    }

    if(foundIndex > -1) {
      newFavoriteProducts.splice(foundIndex,1)
      console.log('removed from favs')
    }

    setFavoriteProducts(newFavoriteProducts)
  }

  const handleProductsInCart = () => {
    let newProductsInCart = [...productsInCart];
    const foundIndex = newProductsInCart.indexOf(product);

    if (foundIndex === -1) {
      newProductsInCart.push(product)
      console.log('added to cart')
    }

    if(foundIndex > -1) {
      newProductsInCart.splice(foundIndex,1)
      console.log('removed from cart')
    }

    setProductsInCart(newProductsInCart)
  }

  return (
    <div className={styles.buttons}>
      <button className={styles.buttonCard} onClick={handleProductsInCart}>
        <p className={styles.buttonText}>
          {isProductInCart ? 'Remove' : 'Add to cart'}
        </p>
      </button>
      <button className={styles.buttonFavorite} onClick={handleFavorites}>
        <img
          className={styles.buttonFavoriteIcon}
          src={favoritesIcon}
          alt="favorite"

        />
      </button>
    </div>
  );
};
