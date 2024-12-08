import React from 'react';
import './ProductSpecs.scss';

type Props = {
  specs: { [key: string]: string };
};

export const ProductSpecs: React.FC<Props> = ({ specs }) => {
  return (
    <div className="product-specs">
      {Object.entries(specs).map(([name, value], index) => (
        <div className="product-specs__entry" key={index}>
          <p className="product-specs__entry-name small-text">{name}</p>
          <p className="product-specs__entry-value small-text">{value}</p>
        </div>
      ))}
    </div>
  );
};
