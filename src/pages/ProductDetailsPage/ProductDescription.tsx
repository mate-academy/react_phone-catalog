import React from 'react';

export const ProductDescription = ({
  description,
  additionalFeatures,
}: ProductDetails) => {
  return (
    <>
      <h3 className="product__heading">About</h3>
      <p className="product__paragraph">
        {description}
      </p>
      {additionalFeatures && (
        <>
          <h4 className="product__subheading">Features</h4>
          <p className="product__paragraph">
            {additionalFeatures}
          </p>
        </>
      )}
    </>
  );
};
