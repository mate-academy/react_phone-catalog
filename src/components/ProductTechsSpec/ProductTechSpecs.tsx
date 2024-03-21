import React, { memo } from 'react';

import './ProductTechSpecs.scss';

type Props = {
  techSpecs: string[][];
};

export const ProductTechSpecs: React.FC<Props> = memo(({ techSpecs }) => {
  return (
    <section className="ProductTechSpecs ProductDetails__specs">
      <h2 className="ProductTechSpecs__title">Tech specs</h2>
      <hr className="ProductTechSpecs__divider" />
      <div className="ProductTechSpecs__specsBlock">
        {techSpecs.map(([key, value]) => (
          <div key={key} className="ProductTechSpecs__spec">
            <p className="ProductTechSpecs__name">{key}</p>
            <p className="ProductTechSpecs__value">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
});
