import React, { FC } from 'react';
import productSpecsStyles from './ProductSpecs.module.scss';
import { Spec } from '../../types/Spec';
import classNames from 'classnames';

type Props = {
  specs: Spec[];
  short?: boolean;
};

export const ProductSpecs: FC<Props> = ({ specs, short = false }) => {
  return (
    <ul className={productSpecsStyles.productSpecs}>
      {specs
        .filter(spec => spec.value)
        .map(spec => (
          <li
            className={classNames(productSpecsStyles.productSpecs__item, {
              [productSpecsStyles['productSpecs__item--is-short']]: short,
            })}
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
