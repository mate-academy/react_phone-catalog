import React from 'react';
import s from './ProductPrice.module.scss';

interface Props {
  priceDiscount: number;
  priceRegular: number;
}

export const ProductPrice: React.FC<Props> = ({
  priceDiscount,
  priceRegular,
}) => (
  <div className={s.ProductPrice}>
    <h2 className={s.ProductPrice__discount}>${priceDiscount}</h2>
    <p className={s.ProductPrice__regular}>${priceRegular}</p>
  </div>
);
