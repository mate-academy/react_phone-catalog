import styles from './NotFoundProduct.module.scss';

export const NotFoundProduct = () => {
  return (
    <div className={styles.product404}>
      <span>Product not found :(</span>
      <a href="./">Go to homepage 🔗</a>
      <img
        src="./img/product-not-found.png"
        alt="Page not found"
        className={styles.product404__image}
      />
    </div>
  );
};
