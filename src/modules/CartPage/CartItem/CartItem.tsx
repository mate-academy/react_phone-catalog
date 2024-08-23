import React/* , { useEffect } */ from 'react';
import styles from './CartItem.module.scss';
import plusIcon from '../../../img/icons/PlusIcon.svg';
import minusIcon from '../../../img/icons/MinusIcon.svg';
import crossIcon from '../../../img/icons/CrossIcon.svg';
import { useAppContext } from '../../../context/AppContext';
/* import { Link } from 'react-router-dom'; */
import { Product} from '../../../types/Product';

type CartItemProps = {
  product: Product;
}

export const CartItem: React.FC<CartItemProps> = ({product}) => {
  const {productsInCart,setProductsInCart,productsInCartCount, setProductsInCartCount, handleNotReady} = useAppContext();

  const foundIndex = productsInCart.indexOf(product);

  const removeFromCart = () => {
    let newProductsInCart = [...productsInCart];
    let newProductsInCartCount = [...productsInCartCount];
    newProductsInCart.splice(foundIndex,1);
    newProductsInCartCount.splice(foundIndex,1);
    console.log('removed from cart');
    setProductsInCart(newProductsInCart);
    setProductsInCartCount(newProductsInCartCount);
  }

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

  const {name, priceDiscount, images} =  product;

  return (
    <div className={styles.cartItem}>
      <div className={styles.mainContainer}>
        <button onClick={removeFromCart} className={styles.deleteButton}>
          <img
            src={crossIcon}
            alt="Delete"
            className={styles.deleteButtonIcon}
          />
        </button>
        {/* <Link to={`/products`} className={styles.productImage}>  */}
          <img
            src={images[0]}
            alt={name}
            className={styles.image}
            onClick={handleNotReady}
          />
        {/* </Link> */}
        <h4 className={styles.label}>{name}</h4>
      </div>
      <div className={styles.quantityControl}>
        <div className={styles.quantity}>
          <button
            onClick={handleCountDecrease}
            /* disabled={quantity <= 1} */
            className={styles.button}
          >
            <img
              src={minusIcon}
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
              src={plusIcon}
              alt="Increase"
              className={styles.controlButtonIcon}
            />
          </button>
        </div>
        <h3 className={styles.price}>${priceDiscount}</h3>
      </div>
    </div>
  );
}
