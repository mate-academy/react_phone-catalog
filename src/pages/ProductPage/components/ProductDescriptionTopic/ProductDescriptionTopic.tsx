import React from 'react';
import { ProductDescription } from '../../../../types/ProductDetails';

type Props = {
  description: ProductDescription;
};

export const ProductDescriptionTopic: React.FC<Props> = ({ description }) => {
  return (
    <>
      <h4>{description.title}</h4>
      {description.text.map(text => (
        <p className="main-text main-text--secondary" key={text}>
          {text}
        </p>
      ))}
    </>
  );
};
