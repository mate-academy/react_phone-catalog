import React from 'react';
import style from './ProductsSpecFull.module.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';

interface Props {
  productDetails: ProductDetailsType;
}

const specs = [
  { title: 'Screen', key: 'screen' },
  { title: 'Resolution', key: 'resolution' },
  { title: 'Processor', key: 'processor' },
  { title: 'RAM', key: 'ram' },
  { title: 'Camera', key: 'camera' },
  { title: 'Zoom', key: 'zoom' },
  { title: 'Cell', key: 'cell' },
];

export const ProductsSpecFull: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className={style.procut_details__tech_specs}>
      <h3 className={style.procut_details__tech_specs_title}>Tech Specs</h3>
      <ul className={style.procut_details__tech_specs_list}>
        {specs.map(spec => {
          const value = productDetails[spec.key as keyof ProductDetailsType];

          if (!value) {
            return null;
          }

          return (
            <li
              key={spec.key}
              className={style.procut_details__tech_specs_item}
            >
              <span className={style.procut_details__tech_specs_text}>
                {spec.title}
              </span>
              <span className={style.procut_details__tech_specs_value}>
                {Array.isArray(value) ? value.join(', ') : value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
