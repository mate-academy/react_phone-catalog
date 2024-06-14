import React from 'react';
import './ProductDescription.scss';
import { DeviceDetails } from '../../helpers/types/DeviceDetails';

type Props = {
  product: DeviceDetails;
};

export const ProductDescription: React.FC<Props> = ({ product }) => {
  const {
    description,
    camera,
    processor,
    screen,
    resolution,
    zoom,
    ram,
    cell,
    capacity,
  } = product;

  return (
    <section className="product-description">
      <article className="product-description__about">
        <h2 className="product-description__article-title">About</h2>

        {description.map(property => (
          <article
            className="product-description__article"
            key={property.title}
          >
            <h3 className="product-description__subtitle">{property.title}</h3>
            <p className="product-description__text">{property.text}</p>
          </article>
        ))}
      </article>
      <article className="product-description__tech-specs">
        <h2 className="product-description__article-title">Tech specs</h2>

        <div className="product-description__tech-table">
          <span className="product-description__tech-name">Screen</span>
          <span className="product-description__tech-value">{screen}</span>

          <span className="product-description__tech-name">Resolution</span>
          <span className="product-description__tech-value">{resolution}</span>

          <span className="product-description__tech-name">Processor</span>
          <span className="product-description__tech-value">{processor}</span>

          <span className="product-description__tech-name">RAM</span>
          <span className="product-description__tech-value">{ram}</span>

          <span className="product-description__tech-name">
            Built in memory
          </span>
          <span className="product-description__tech-value">{capacity}</span>

          <span className="product-description__tech-name">Camera</span>
          <span className="product-description__tech-value">{camera}</span>

          <span className="product-description__tech-name">Zoom</span>
          <span className="product-description__tech-value">{zoom}</span>

          <span className="product-description__tech-name">Cell</span>
          <span className="product-description__tech-value">{cell}</span>
        </div>
      </article>
    </section>
  );
};
