import React from 'react';
import styles from './ActionButtons.module.scss';
import favoritesIcon from '../../img/icons/fav.svg';
import { useAppContext } from '../../context/AppContext';
import { LimitedProduct} from '../../types/Product';

type ButtonProps = {
  product: LimitedProduct | undefined;
  // handleSelectedProduct: (newState: string) => "";
};

export const ActionButtons: React.FC<ButtonProps> = ({product}) => {
  // @ts-ignore
  const { favoriteProducts, setFavoriteProducts, productsInCart, setProductsInCart, productsInCartCount, setProductsInCartCount} = useAppContext();

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
      } else {
        newFavoriteProducts.splice(foundIndex, 1);
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
    console.log('found inde', foundIndex);
    }

    if (foundIndex === -1 && product !== undefined) {
      newProductsInCart.push(product)
      newProductsInCartCount.push(1);
      console.log('added to cart',newProductsInCart,newProductsInCartCount)
    }

    if (foundIndex > -1) {
      newProductsInCart.splice(foundIndex,1)
      newProductsInCartCount.splice(foundIndex,1)
      console.log('removed from cart',newProductsInCart,newProductsInCartCount);
    }

    setProductsInCart(newProductsInCart);
    setProductsInCartCount(newProductsInCartCount);
  }

  return (
    <div className={styles.buttons}>
      <button className={styles.buttonCard} onClick={handleProductsInCart}>
        <p className={styles.buttonText}>
          Add to cart
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
