import React from 'react';
import { v4 as getId } from 'uuid';

import { ProductDescrType } from '../../types/ProductDescrType';

type Props = {
  productDescr: ProductDescrType[],
};

export const ProductAbout: React.FC<Props> = ({
  productDescr,
}) => {
  return (
    <div className="product__about">
      <h3 className="product__subtitle">
        About
      </h3>

      <div className="product__line" />

      {productDescr.map(({ title, text }: ProductDescrType) => (
        <div
          key={getId()}
          className="product__about-descr-wrapper"
        >
          <h4 className="product__about-descr-title">
            {title}
          </h4>

          {text.map(textEl => (
            <p
              className="product__about-descr"
              key={getId()}
            >
              {textEl}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
