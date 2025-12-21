import {
  ProductInCart,
  useProductInCart,
} from '../../../shared/Utills/ShopingCartContext';

import styles from './Total.module.scss';

type Props = {
  products: ProductInCart[];
};

export const Total: React.FC<Props> = ({ products }) => {
  const { dispatch } = useProductInCart();

  const totalPrice = products.reduce(
    (acum, product) => acum + product.product.price * product.quantity,
    0,
  );

  const totalItems = products.reduce(
    (acum, product) => acum + product.quantity,
    0,
  );

  const handleCheckout = () => {
    const isComfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isComfirmed) {
      dispatch({ type: 'REMOVE_ALL' });
    }
  };

  return (
    <div className={styles.total}>
      <h2 className={styles.total__price}>${totalPrice}</h2>
      <p className={styles.total__info}>Total for {totalItems} items</p>
      <div className={styles.total__line}></div>
      <button className={styles.total__button} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};
