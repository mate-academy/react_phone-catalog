import { ProductDetailsType } from 'types/productInfoTypes';

import React from 'react';
import cn from 'classnames';
import style from './ProductTechSpecs.module.scss';

interface ProductTechSpecsProps {
  productDetails: ProductDetailsType;
}

export const ProductTechSpecs: React.FC<ProductTechSpecsProps> = ({
  productDetails,
}) => {
  const productTechSpecsMap = [
    { title: 'Screen', key: 'screen' },
    { title: 'Resolution', key: 'resolution' },
    { title: 'Processor', key: 'processor' },
    { title: 'RAM', key: 'ram' },
    { title: 'Camera', key: 'camera' },
    { title: 'Zoom', key: 'zoom' },
    { title: 'Cell', key: 'cell' },
  ];

  return (
    <div className={style.product_tech_spec}>
      <h3 className={cn(style.product_tech_spec__title, 'three-title')}>
        Tech specs
      </h3>

      <ul className={style.product_tech_spec__list}>
        {productTechSpecsMap.map(spec => {
          const value = productDetails[spec.key as keyof ProductDetailsType];

          if (!value) {
            return null;
          }

          return (
            <li key={spec.key} className={style.product_tech_spec__item}>
              <span className={style.product_tech_spec__item_name}>
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
