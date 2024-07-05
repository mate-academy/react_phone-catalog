import React from 'react';
import { ProductDetails } from '../../../../types/ProductDetails';
import './TechSpecs.scss';

type Props = {
  product: ProductDetails | null;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  const productTech = [
    { label: 'Screen', value: product?.screen },
    { label: 'Resolution', value: product?.resolution },
    { label: 'Processor', value: product?.processor },
    { label: 'RAM', value: product?.ram },
    { label: 'Built in memory', value: product?.capacity },
    { label: 'Camera', value: product?.camera },
    { label: 'Zoom', value: product?.zoom },
    { label: 'cell', value: product?.cell.join(', ') },
  ];

  return (
    <>
      <div className="h3 techSpecs__title">Tech specs</div>
      <span className="techSpecs__detail"></span>

      <div className="techSpecs__content">
        {productTech.map(
          ch =>
            ch.value && (
              <div key={ch.label} className="techSpecs__block">
                <p className="techSpecs__prop">{ch.label}</p>
                <p className="techSpecs__text">{ch.value}</p>
              </div>
            ),
        )}
      </div>
    </>
  );
};
