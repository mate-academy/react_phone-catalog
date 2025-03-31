import { ProductDetailsType } from 'types/productInfoTypes';

import React from 'react';
import cn from 'classnames';
import style from './ProductAbout.module.scss';

interface ProductAboutProps {
  productDetails: ProductDetailsType;
}

export const ProductAbout: React.FC<ProductAboutProps> = ({
  productDetails,
}) => {
  return (
    <div className={style.product_desc}>
      <h3 className={cn(style.product_desc__title, 'three-title')}>About</h3>

      <ul className={style.product_desc__list}>
        {productDetails.description.map(product => (
          <li key={product.title} className={style.product_desc__item}>
            <h4 className={cn(style.product_desc__item_title, 'small-title')}>
              {product.title}
            </h4>

            <p className={style.product_desc__item_text}>{product.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
