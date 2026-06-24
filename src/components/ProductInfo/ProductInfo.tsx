import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import style from './ProductInfo.module.scss';

type Props = {
  product: ProductDetails | null;
};

export const ProductInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className={style.productInfo}>
      <h3 className={style.productInfo__title}>About</h3>
      <div className={style.productInfo__description}>
        {product?.description.map((section, index) => (
          <div key={index} className={style.productInfo__section}>
            <h4 className={style.productInfo__sectionTitle}>{section.title}</h4>
            <p className={style.productInfo__sectionText}>{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
