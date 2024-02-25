/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

import '../styles/Params.scss';

interface Props {
  product: Product | ProductDetails;
  params: string[]
}

export const Params: React.FC<Props> = ({ product, params }) => {
  return (
    <div className="params">
      {params.map(item => (
        <div className="params__param" key={item}>
          <span className="params__param-name">
            {item}
          </span>

          <span className="params__param-value">
            {product[item.toLowerCase() as keyof (Product | ProductDetails)]}
          </span>
        </div>
      ))}
    </div>
  );
};
