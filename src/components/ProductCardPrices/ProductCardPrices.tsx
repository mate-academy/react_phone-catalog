import cn from 'classnames';
import styles from './ProductCardPrices.module.scss';

type Props = {
  isHotPrice: boolean;
  price: number;
  fullPrice: number;
  fontSize: string;
};

export const ProductCardPrices: React.FC<Props> = ({
  isHotPrice,
  price,
  fullPrice,
  fontSize,
}) => {
  return (
    <div className={styles.cardPrices}>
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
