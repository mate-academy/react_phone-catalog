import React from 'react';
import style from './ProductSpecFull.module.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';

interface Props {
  productDetails: ProductDetailsType;
}

export const ProductSpecFull: React.FC<Props> = ({ productDetails }) => {
  const specs = [
    { title: 'Screen', key: 'screen' },
    { title: 'Resolution', key: 'resolution' },
    { title: 'Processor', key: 'processor' },
    { title: 'RAM', key: 'ram' },
    { title: 'Camera', key: 'camera' },
    { title: 'Zoom', key: 'zoom' },
    { title: 'Cell', key: 'cell' },
  ];

  return (
    <div className={style.product_details__spec_full}>
      <h3 className={style.product_details__spec_full_title}>Tech specs</h3>

      <ul className={style.product_details__spec_full_list}>
        {specs.map(spec => {
          const value = productDetails[spec.key as keyof ProductDetailsType];

          if (!value) {
            return null;
          }

          return (
            <li
              key={spec.key}
              className={style.product_details__spec_full_item}
            >
              <span className={style.product_details__spec_full_text}>
                {spec.title}
              </span>

              <span className={style.product_details__spec_full_value}>
                {Array.isArray(value) ? value.join(', ') : value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
