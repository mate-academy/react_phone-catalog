import styles from './CartEmpty.module.scss';

export const CartEmpty = () => {
  return (
    <div className={styles.ce__img_container}>
      {' '}
      <img
        className={styles.ce__image}
        src="/img/cart-is-empty.png"
        alt="Nice Gadgets"
      />
    </div>
  );
};
