import {
  getTotalAmountOfItems,
  getTotalPriceOfProducts,
} from '../../../../helpers/helpers';
import { useAppSelector } from '../../../../hooks/hooks';
import styles from './CheckoutInformation.module.scss';

export const CheckoutInformation = () => {
  const { items } = useAppSelector(state => state.cart);

  const totalAmountOfItems = getTotalAmountOfItems(items);

  const totalPriceOfProducts = getTotalPriceOfProducts(items);

  return (
    <div className={styles.checkout_information}>
      <div className={styles.checkout_information__wrapper}>
        <div className={styles.checkout_information__box}>
          <h2 className={styles.checkout_information__price}>
            ${totalPriceOfProducts}
          </h2>
          <p className={styles.checkout_information__total}>
            Total for {totalAmountOfItems} items
          </p>
        </div>
        <div className={styles.checkout_information__button}>
          <button className={styles.checkout_information__btn}>Checkout</button>
        </div>
      </div>
    </div>
  );
};
