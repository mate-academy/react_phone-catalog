import classNames from 'classnames';
import styles from './cardPrice.module.scss';

type Props = {
  fullPrice?: number;
  price?: number;
  year?: number;
  prodDet?: boolean;
  cart?: boolean;
};

export const CardPrice: React.FC<Props> = ({
  fullPrice,
  price,
  year = 0,
  prodDet = false,
  cart = false,
}) => {
  return (
    <>
      {year <= 2019 && !cart ? (
        <div
          className={classNames(styles.cardPrice, {
            [styles['cardPrice--size']]: prodDet,
            [styles['cardPrice--border']]: cart,
          })}
        >
          <span>$</span>
          {price}
          <span> </span>
          <span className={styles.cardFullPrice}>${fullPrice}</span>
        </div>
      ) : (
        <div
          className={classNames(styles.cardPrice, {
            [styles['cardPrice--size']]: prodDet,
            [styles['cardPrice--border']]: cart,
          })}
        >
          <span>$</span>
          {fullPrice}
        </div>
      )}
    </>
  );
};
