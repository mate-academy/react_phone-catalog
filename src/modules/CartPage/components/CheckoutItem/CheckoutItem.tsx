import { useContext } from 'react';
import styles from './CheckoutItem.module.scss';
import { TextButton } from 'components/TextButton';
import { ProductsContext } from 'store/ProductsContext';

export const CheckoutItem = () => {
  const { cartProducts, cartTotalPrice } = useContext(ProductsContext);

  return (
    <div className={styles.container}>
      <span className={styles.container__price}>{`$${cartTotalPrice}`}</span>
      <span className={styles.container__amount}>
        {`Total for ${cartProducts.length} items`}
      </span>
      <hr />
      <div>
        <TextButton title={'Checkout'} height={'48px'} />
      </div>
    </div>
  );
};
