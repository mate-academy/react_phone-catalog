import { formatPrice } from '../../utils/formatPrice';
import style from './Price.module.scss';

type Props = {
  price: number;
  fullPrice: number;
  hasDiscount?: boolean;
  fontSize?: number;
};

export const Price: React.FC<Props> = ({
  price,
  fullPrice,
  hasDiscount = false,
  fontSize = 22,
}) => {
  return (
    <div className={style.priceWrapper}>
      {hasDiscount ? (
        <>
          <strong
            className={style.price}
            style={
              { '--price-font-size': `${fontSize}px` } as React.CSSProperties
            }
          >
            {formatPrice(price)}
          </strong>
          <strong className={style.fullPrice}>{formatPrice(fullPrice)}</strong>
        </>
      ) : (
        <strong
          className={style.price}
          style={
            { '--price-font-size': `${fontSize}px` } as React.CSSProperties
          }
        >
          {formatPrice(fullPrice)}
        </strong>
      )}
    </div>
  );
};
