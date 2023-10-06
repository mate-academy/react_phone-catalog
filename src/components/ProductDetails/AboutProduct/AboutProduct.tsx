import React from 'react';
import { ProductDetails } from '../../../types/ProductDetails';

type Props = {
  description: ProductDetails
};

export const AboutProduct: React.FC<Props> = ({ description }) => (
  <div className="about-product__column column-product-about">
    <div className="column-product-about__title">About</div>
    {description.description.map(product => (
      <React.Fragment key={product.title}>
        <div className="about-product__title">{product.title}</div>
        <div className="about-product__text">{product.text}</div>
      </React.Fragment>
    ))}
  </div>
);
