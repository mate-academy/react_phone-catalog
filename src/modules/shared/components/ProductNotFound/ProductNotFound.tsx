import styles from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  return (
    <div className={styles.status}>
      Product was not found
      <img src="./img/image/NotFound/productNF.png" alt="Product not found" />
    </div>
  );
};
