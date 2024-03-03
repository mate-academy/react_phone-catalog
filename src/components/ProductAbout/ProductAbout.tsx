import './ProductAbout.scss';
import { memo } from 'react';
import { ProductAboutProps } from './types';

export const ProductAbout = memo<ProductAboutProps>(({ description }) => (
  <div className="product-about">
    <h2 className="product-about__title">About</h2>
    <div className="divider" />
    <div className="product-about-container">
      {description.map(desc => (
        <div
          className="product-about__item"
          key={desc.title}
        >
          <h3 className="product-about__item__title">
            {desc.title}
          </h3>
          <p className="product-about__item__text">
            {desc.text}
          </p>
        </div>
      ))}
    </div>
  </div>
));
