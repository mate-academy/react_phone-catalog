/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

import '../styles/Params.scss';

interface Props {
  product: Product | ProductDetails;
  params: string[];
}

export const Params: React.FC<Props> = ({ product, params }) => {
  return (
    <div className="params">
      {params.map(name => {
        const key = name === 'Built in memory' ? 'capacity' : name;

        let value =
          product[key.toLowerCase() as keyof (Product | ProductDetails)];

        if (Array.isArray(value)) {
          value = value.join(', ');
        }

        return (
          <div className="params__param" key={key}>
            <span className="params__param-name">{name}</span>

            <span className="params__param-value">{value}</span>
          </div>
        );
      })}
    </div>
  );
};
