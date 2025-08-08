import React from 'react';
import {
  DetailProductType,
  Product,
  ProductEnum,
} from '../../../../types/ProductType';
import { TechSpecs } from '../TechSpecs';
import techListClass from './techSpecsList.module.scss';
import cn from 'classnames';

interface Props {
  product: Product | DetailProductType;
  variant?: string;
}

export const TechSpecsList: React.FC<Props> = React.memo(
  ({ product, variant }) => {
    const property: string[] = Object.keys(ProductEnum);

    return (
      <div
        className={cn([
          techListClass['tech-list'],
          techListClass[`tech-list--${variant}`],
        ])}
      >
        {property.map((prop, i) => (
          <TechSpecs
            key={i}
            prop={prop as keyof typeof ProductEnum}
            product={product}
            variant={variant}
          />
        ))}
      </div>
    );
  },
);

TechSpecsList.displayName = 'TechSpecsList';
