import styles from './ProductPrice.module.scss';

type Props = {
  price: number;
  fullPrice?: number;
  showFullPrice?: boolean;
};

export const ProductPrice: React.FC<Props> = ({
  price,
  fullPrice,
  showFullPrice = true,
}) => {
  return (
    <div className={styles.price}>
      <span className={styles.current}>${price}</span>
      {showFullPrice && fullPrice && fullPrice > price && (
        <span className={styles.old}>${fullPrice}</span>
      )}
    </div>
  );
};
