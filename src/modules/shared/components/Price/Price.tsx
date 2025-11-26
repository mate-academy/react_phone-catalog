import { useMemo } from 'react';
import scss from './Price.module.scss';

interface Props {
  normal: number;
  discount: number;
  hasDiscount: boolean;
}

export const Price: React.FC<Props> = ({ normal, discount, hasDiscount }) => {
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    [],
  );

  const normalPrice = formatter.format(normal);
  const discountPrice = discount ? formatter.format(discount) : null;

  return (
    <div className={scss.price}>
      <p className={scss.price__value}>
        {discount ? discountPrice : normalPrice}
      </p>
      {hasDiscount && <p className={scss.price__discount}>{normalPrice}</p>}
    </div>
  );
};
