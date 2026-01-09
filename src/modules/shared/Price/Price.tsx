import cn from 'classnames';
import style from './Price.module.scss';

type Props = {
  fullPrice: number;
  newPrice?: number;
  border?: boolean;
  discountPrice?: boolean;
};

export const Price = ({
  newPrice,
  fullPrice,
  border = true,
  discountPrice = true,
}: Props) => (
  <div
    className={cn(style.discount, {
      [style.discount__border]: !border,
    })}
  >
    <p className={style.discount__newPrice}>${newPrice}</p>
    {discountPrice && fullPrice && (
      <p className={style.discount__fullPrice}>${fullPrice}</p>
    )}
  </div>
);
