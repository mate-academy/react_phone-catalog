import classNames from 'classnames';
import styles from './ProductPrice.module.scss';

type Props = {
  newPrice: number | string;
  oldPrice: number | string;
  showDiscount: boolean;
  big?: boolean;
};

export const ProductPrice: React.FC<Props> = ({
  oldPrice,
  newPrice,
  showDiscount,
  big,
}) => (
  <>
    <h3
      className={classNames(styles.price, {
        [styles.big]: big,
      })}
    >
      ${newPrice}
    </h3>
    {showDiscount && <span className={styles.fullPrice}>${oldPrice}</span>}
  </>
);

export default ProductPrice;
