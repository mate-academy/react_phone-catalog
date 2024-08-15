import cn from 'classnames';
import styles from './PriceInfo.module.scss';

type Props = {
  isHotPrice: boolean;
  price: number;
  fullPrice: number;
  fontSize: string;
};

export const PriceInfo: React.FC<Props> = ({
  isHotPrice,
  price,
  fullPrice,
  fontSize,
}) => {
  return (
    <div className={styles.priceInfo}>
      <p
        style={{
          fontSize: fontSize,
        }}
        className={styles.price}
      >
        ${isHotPrice ? price : fullPrice}
      </p>

      {isHotPrice && (
        <p className={cn(styles.price, styles['price--active'])}>
          ${fullPrice}
        </p>
      )}
    </div>
  );
};
