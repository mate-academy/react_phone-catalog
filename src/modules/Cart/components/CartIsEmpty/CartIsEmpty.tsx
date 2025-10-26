import styles from './CartIsEmpty.module.scss';

export const CartIsEmpty = () => {
  return <div className={styles.status}>Your cart is empty</div>;
};
