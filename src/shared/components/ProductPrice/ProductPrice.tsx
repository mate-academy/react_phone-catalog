import styles from './ProductPrice.module.scss';

interface Props {
  price: number;
  fullPrice: number;
}

export const ProductPrice = ({ price, fullPrice }: Props) => {
  return (
    <div className={styles.productPrice}>
      {price === fullPrice ? (
        <h3 className={styles.price}>{`$${price}`}</h3>
      ) : (
        <>
          <h3 className={styles.price}>{`$${price}`}</h3>
          <h3 className={styles.fullPrice}>{`$${fullPrice}`}</h3>
        </>
      )}
    </div>
  );
};
