import React from 'react';
import styles from './CartItem.module.scss';
import plusIcon from '../../../img/icons/PlusIcon.svg';
import minusIcon from '../../../img/icons/MinusIcon.svg';
import crossIcon from '../../../img/icons/CrossIcon.svg';
import plusIconDT from '../../../img/icons/PlusIcon--DarkTheme.svg';
import minusIconDT from '../../../img/icons/MinusIcon--DarkTheme.svg';
import crossIconDT from '../../../img/icons/CrossIcon--DarkTheme.svg';
import { useAppContext } from '../../../context/AppContext';
import { LimitedProduct } from '../../../types/Product';
import { Link } from 'react-router-dom';

type CartItemProps = {
  product: LimitedProduct;
};

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { productsInCart, setProductsInCart, productsInCartCount, setProductsInCartCount, theme } = useAppContext();

  const foundIndex = productsInCart.findIndex(p => p.id === product.id);

  const removeFromCart = () => {
    let newProductsInCart = [...productsInCart];
    let newProductsInCartCount = [...productsInCartCount];
    newProductsInCart.splice(foundIndex, 1);
    newProductsInCartCount.splice(foundIndex, 1);
    setProductsInCart(newProductsInCart);
    setProductsInCartCount(newProductsInCartCount);
  };

  const handleCountIncrease = () => {
    let newProductsInCartCount = [...productsInCartCount];
    newProductsInCartCount[foundIndex]++;
    setProductsInCartCount(newProductsInCartCount);
  };

  const handleCountDecrease = () => {
    let newProductsInCartCount = [...productsInCartCount];
    if (newProductsInCartCount[foundIndex] > 0) {
      newProductsInCartCount[foundIndex]--;
      setProductsInCartCount(newProductsInCartCount);
    }
  };

  const { name, price, image } = product;

  return (
    <div className={styles.cartItem}>
      <div className={styles.mainContainer}>
        <button onClick={removeFromCart} className={styles.deleteButton}>
          <img
            src={`${theme === 'dark' ? crossIconDT : crossIcon}`}
            alt="Delete"
            className={styles.deleteButtonIcon}
          />
        </button>
        <Link to={`/product/${encodeURIComponent(product.itemId)}`}>
          <img
            src={image}
            alt={name}
            className={styles.image}
          />
        </Link>
        <h4 className={styles.label}>{name}</h4>
      </div>
      <div className={styles.quantityControl}>
        <div className={styles.quantity}>
          <button
            onClick={handleCountDecrease}
            className={styles.button}
          >
            <img
              src={`${theme === 'dark' ? minusIconDT : minusIcon}`}
              alt="Decrease"
              className={styles.controlButtonIcon}
            />
          </button>
          <div className={styles.quantityValueContainer}>
            <p className={styles.quantityValue}>
              {productsInCartCount[foundIndex]}
            </p>
          </div>
          <button
            onClick={handleCountIncrease}
            className={styles.button}
          >
            <img
              src={`${theme === 'dark' ? plusIconDT : plusIcon}`}
              alt="Increase"
              className={styles.controlButtonIcon}
            />
          </button>
        </div>
        <h3 className={styles.price}>${price}</h3>
      </div>
    </div>
  );
};
