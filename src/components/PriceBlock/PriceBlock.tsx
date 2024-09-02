import styles from './PriceBlock.module.scss';

type Props = {
  price: number;
  priceDiscount: number;
};

export const PriceBlock: React.FC<Props> = ({ price, priceDiscount }) => {
  return (
    <div className={styles.priceWrapper}>
      <h3>${priceDiscount}</h3>
      <h3 className={styles.priceWrapper__fullPrice}>${price}</h3>
    </div>
  );
};
