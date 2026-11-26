import styles from './PriceSection.module.scss';

interface PriceSectionProps {
  priceDiscount: number;
  priceRegular: number;
}

export function PriceSection({
  priceDiscount,
  priceRegular,
}: PriceSectionProps): JSX.Element {
  const hasDiscount = priceRegular > priceDiscount;

  return (
    <div className={styles.price}>
      <span className={styles.currentPrice}>${priceDiscount}</span>
      {hasDiscount && (
        <span className={styles.originalPrice}>${priceRegular}</span>
      )}
    </div>
  );
}
