import styles from './price.module.scss';
type Props = {
  fullPrice: number;
  discount: number;
};
export const Price = ({ fullPrice, discount }: Props) => {
  return (
    <div className={styles.price}>
      <span className={styles.price__fullprice}>${discount}</span>
      <span className={styles.price__discount}>${fullPrice}</span>
    </div>
  );
};
