import React, { FC } from 'react';
import productSpecsStyles from './ProductSpecs.module.scss';
import { Spec } from '../../types/Spec';

type Props = {
  specs: Spec[];
};

export const ProductSpecs: FC<Props> = ({ specs }) => {
  return (
    <ul className={productSpecsStyles.productSpecs}>
      {specs
        .filter(spec => spec.value)
        .map(spec => (
          <li
            className={productSpecsStyles.productSpecs__item}
            key={spec.label}
          >
            <span className={productSpecsStyles.productSpecs__label}>
              {spec.label}
            </span>
            <span className={productSpecsStyles.productSpecs__value}>
              {spec.value}
            </span>
          </li>
        ))}
    </ul>
  );
};
