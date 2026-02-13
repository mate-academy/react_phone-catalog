import React from 'react';
import {
  DetailProductType,
  Product,
  ProductEnum,
} from '../../../../types/ProductType';
import techSpecsClass from './techSpecs.module.scss';
import cn from 'classnames';

interface Props {
  prop: keyof typeof ProductEnum;
  product: Product | DetailProductType;
  variant?: string;
}

export const TechSpecs: React.FC<Props> = React.memo(
  ({ product, prop, variant }) => {
    if (!(prop in product)) {
      return null;
    }

    const key = ProductEnum[prop as keyof typeof ProductEnum];

    const value = String(product[prop as keyof typeof product])
      .split(',')
      .join(', ');

    return (
      <ul
        className={cn(
          techSpecsClass['tech-spacs'],
          techSpecsClass[`tech-spacs--${variant}`],
        )}
      >
        <li
          className={cn([
            techSpecsClass['tech-spacs__name'],
            techSpecsClass[`tech-spacs__name--${variant}`],
          ])}
        >
          {key}
        </li>
        <li
          className={cn([
            techSpecsClass['tech-specs__value'],
            techSpecsClass[`tech-specs__value--${variant}`],
          ])}
        >
          {value}
        </li>
      </ul>
    );
  },
);

TechSpecs.displayName = 'TechSpecs';
