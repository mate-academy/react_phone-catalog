import React from 'react';
import style from './ProductSpecMain.module.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';

interface Props {
  productDetails: ProductDetailsType;
}

export const ProductSpecMain: React.FC<Props> = ({ productDetails }) => {
  const productSpecMain = [
    { title: 'Screen', specs: 'screen' },
    { title: 'Resolution', specs: 'resolution' },
    { title: 'Processor', specs: 'processor' },
    { title: 'RAM', specs: 'ram' },
  ];

  return (
    <div className={style.product_details__specs}>
      <ul className={style.product_details__specs_list}>
        {productSpecMain.map(product => (
          <li key={product.specs} className={style.product_details__specs_item}>
            <span className={style.product_details__specs_property}>
              {product.title}
            </span>

            <span className={style.product_details__specs_value}>
              {String(
                productDetails[product.specs as keyof ProductDetailsType],
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
