import React from 'react';
import './ProductAddInfo.scss';
import { ProductDetails } from '../../../types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const ProductAddInfo: React.FC<Props> = ({ product }) => {
  const techSpecs = [
    {
      title: 'Screen',
      info: product.screen,
    },
    {
      title: 'Resolution',
      info: product.resolution,
    },
    {
      title: 'Processor',
      info: product.processor,
    },
    {
      title: 'RAM',
      info: product.ram,
    },
    {
      title: 'Built in memory',
      info: product.capacity,
    },
    {
      title: 'Camera',
      info: product.camera,
    },
    {
      title: 'Zoom',
      info: product.zoom,
    },
    {
      title: 'Cell',
      info: product.cell.join(', '),
    },
  ];

  return (
    <section className="add-info">
      <div className="add-info__about">
        <h3 className="add-info__title">About</h3>
        <div className="add-info__border"></div>

        <div className="add-info__description">
          {product.description.map((description, index) => (
            <article className="add-info__description-article" key={index}>
              <h4 className="add-info__description-title">
                {description.title}
              </h4>
              <p className="add-info__description-text">{description.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="add-info__tech">
        <h3 className="add-info__title">Tech specs</h3>
        <div className="add-info__border"></div>

        <ul className="add-info__specs">
          {techSpecs.map(techSpec => (
            <li className="add-info__specs-container" key={techSpec.title}>
              <p className="add-info__specs-title">{techSpec.title}</p>
              <p className="add-info__specs-text">{techSpec.info}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
