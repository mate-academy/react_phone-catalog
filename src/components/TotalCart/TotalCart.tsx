import { useContext } from 'react';
import styles from './TotalCart.module.scss';
import { ProductContext } from '../../context/ProductContext';

const TotalCart = () => {
  const { getTotalSum, setCart, totalItemsInCart } = useContext(ProductContext);

  const handleCheckout = () => {
    const userConfirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (userConfirmed) {
      setCart([]);
    }
  };

  return (
    <div className={styles.total}>
      <div className={styles.top}>
        <h1 className={styles.totalPrice}>{`$${getTotalSum()}`}</h1>
        <p
          className={styles.totalCount}
        >{`Total for ${totalItemsInCart} items`}</p>
      </div>
      <div className={styles.bottom}>
        <button className={styles.checkout} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default TotalCart;
