import React from 'react';
import style from './ProductsSpecMain.module.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';

interface Props {
  productDetails: ProductDetailsType;
}

const productsSpecsMain = [
  { title: 'Screen', specs: 'screen' },
  { title: 'Resolution', specs: 'resolution' },
  { title: 'Processor', specs: 'processor' },
  { title: 'RAM', specs: 'ram' },
];

export const ProductsSpecMain: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className={style.product_details__specs}>
      <ul className={style.product_details__specs_list}>
        {productsSpecsMain.map(product => (
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
