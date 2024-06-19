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
    <div className={styles.ProductCardPrices}>
      <p
        style={{
          fontSize: fontSize,
        }}
        className={styles.Price}
      >
        ${isHotPrice ? price : fullPrice}
      </p>

      {isHotPrice && (
        <p className={`${styles.ProductCardPrice} ${styles.PriceActive}`}>
          ${fullPrice}
        </p>
      )}
    </div>
  );
};
