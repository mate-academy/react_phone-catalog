import styles from './ProductNotFound.module.scss';
type Props = {
  type: 'tablets' | 'accessories' | 'phones' | 'favourites';
};
export const ProductNotFound = ({ type }: Props) => {
  return (
    <div className={styles.product}>
      <img
        className={styles.product__image}
        src="./img/product-not-found.png"
      />
      <p className={styles.product__title}>There are no, {type} yet!</p>
    </div>
  );
};
