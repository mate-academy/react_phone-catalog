import React from 'react';
import style from './ProductAbout.module.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';

interface Props {
  productDetails: ProductDetailsType;
}

export const ProductAbout: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className={style.product_details__about}>
      <h3 className={style.product_details__about_title}>About</h3>

      <div className={style.product_details__about_desc}>
        <ul className={style.product_details__about_list}>
          {productDetails.description.map(product => (
            <li
              key={product.title}
              className={style.product_details__about_item}
            >
              <h4 className={style.product_details__about_item_title}>
                {product.title}
              </h4>

              <p className={style.product_details__about_item_text}>
                {product.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
