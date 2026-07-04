import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.cart__empty}>
      <h3 className={styles.cart__emptyText}>Not found page</h3>
      <img
        className={styles.cart__emptyImg}
        src="./img/page-not-found.png"
        alt="Cart is empty"
      />
    </div>
  );
};
