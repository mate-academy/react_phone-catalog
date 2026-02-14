import React from 'react';
import * as Types from '../../../../types';

type Props = {
  selectedProduct: Types.ProductDetails;
};

export const TechBlock: React.FC<Props> = ({ selectedProduct }) => {
  const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
    selectedProduct;
  const techSpecs = [
    { title: Types.TechSpecs.Screen, text: screen },
    { title: Types.TechSpecs.Resolution, text: resolution },
    { title: Types.TechSpecs.Processor, text: processor },
    { title: Types.TechSpecs.RAM, text: ram },
    { title: Types.TechSpecs.Built, text: capacity },
    { title: Types.TechSpecs.Camera, text: camera },
    { title: Types.TechSpecs.Zoom, text: zoom },
    { title: Types.TechSpecs.Cell, text: cell && cell.join(', ') },
  ];

  return (
    <div className="product-details__info--tech tech">
      <h3 className="tech__title">Tech specs</h3>

      {techSpecs
        .filter(({ text }) => text)
        .map(({ title, text }) => (
          <div key={title} className="tech__textBlock">
            <p className="body-text tech__textBlock--left">{title}</p>
            <p className="body-text">{text}</p>
          </div>
        ))}
    </div>
  );
};
