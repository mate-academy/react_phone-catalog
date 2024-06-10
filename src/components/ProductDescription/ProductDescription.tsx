import React from 'react';
import './ProductDescription.scss';
import { DeviceDetails } from '../../helpers/types/DeviceDetails';

type Props = {
  product: DeviceDetails;
};

export const ProductDescription: React.FC<Props> = ({ product }) => {
  const { description, android, camera, battery, display } = product;

  return (
    <section className="product-description">
      <article className="product-description__about">
        <h2 className="product-description__article-title">About</h2>
        <p className="product-description__text">{description}</p>
      </article>
      <article className="product-description__tech-specs">
        <h2 className="product-description__article-title">Tech specs</h2>

        <div className="product-description__tech-table">
          <span className="product-description__tech-name">OS</span>
          <span className="product-description__tech-value">{android.os}</span>

          <span className="product-description__tech-name">Camera</span>
          <span className="product-description__tech-value">
            {camera.primary}
          </span>

          <span className="product-description__tech-name">Display</span>
          <span className="product-description__tech-value">{`${display.screenResolution} / ${display.screenSize}`}</span>

          <span className="product-description__tech-name">Battery</span>
          <span className="product-description__tech-value">
            {battery.type}
          </span>

          <span className="product-description__tech-name">Talk Time</span>
          <span className="product-description__tech-value">
            {battery.talkTime}
          </span>
        </div>
      </article>
    </section>
  );
};
