import classNames from 'classnames';
import styles from './Price.module.scss';

type Props = {
  price: number | undefined;
  fullPrice: number | undefined;
  withFullPrice?: boolean;
  classNameProp?: string;
};
export const Price: React.FC<Props> = ({
  price,
  fullPrice,
  withFullPrice = false,
  classNameProp = '',
}) => {
  return (
    <p className={classNames(styles.price, classNameProp)}>
      ${price}
      &nbsp;
      {withFullPrice && (
        <span className={styles.price__fullPrice}>${fullPrice}</span>
      )}
    </p>
  );
};
