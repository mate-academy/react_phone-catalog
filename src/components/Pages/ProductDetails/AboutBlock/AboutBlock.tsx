import React from 'react';
import * as Types from '../../../../types';

type Props = {
  selectedProduct: Types.ProductDetails;
};

export const AboutBlock: React.FC<Props> = ({ selectedProduct }) => {
  const { description } = selectedProduct;

  return (
    <div className="product-details__info--about about">
      <h3 className="about__title">About</h3>

      {description.map(({ title, text }) => (
        <div key={title} className="about__text-Block">
          <h4>{title}</h4>
          <p className="body-text about__text-Block--text">{text}</p>
        </div>
      ))}
    </div>
  );
};
