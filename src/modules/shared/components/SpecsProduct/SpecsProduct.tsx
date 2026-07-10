import React from 'react';
import './SpecsProduct.scss';

type Specs = {
  Screen: string;
  Resolution: string;
  Processor: string;
  RAM: string;
  Capacity: string;
  'Built in memory': string;
  Zoom: string;
  Cell: string | string[];
  Camera: string;
};

type Props = {
  className: string;
  specs: Partial<Specs>;
};

export const SpecsProduct: React.FC<Props> = ({ className, specs }) => (
  <div className={`specs-product ${className}`}>
    {Object.entries(specs).map(([key, value], index) => {
      let completedValue = value;

      if (typeof value === 'object') {
        completedValue = value.join(', ');
      }

      return (
        <div className="specs-product__section" key={index}>
          <p className="specs-product__text-left">{key}</p>
          <p className="specs-product__text-right">{completedValue}</p>
        </div>
      );
    })}
  </div>
);
