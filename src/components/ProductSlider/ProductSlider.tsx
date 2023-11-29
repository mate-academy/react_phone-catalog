/* eslint-disable max-len */
import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.scss';

type Props = {
  products: Product[];
  title: string;
};

const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const step = 1;
  const frameSize = 4;
  const itemWidth = 272;
  const animationDuration = 1000;
  const gap = 16;
  let translateGap = 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const maxCurrentImage = products.length - frameSize;

  const nextImage = () => {
    if (currentImageIndex !== maxCurrentImage) {
      setCurrentImageIndex((prevIndex) => Math.min(prevIndex + step, maxCurrentImage));
    } else {
      setCurrentImageIndex(0);
    }
  };

  const prevImage = () => {
    if (currentImageIndex !== 0) {
      setCurrentImageIndex((prevIndex) => Math.max(prevIndex - step, 0));
    } else {
      setCurrentImageIndex(maxCurrentImage);
    }
  };

  if (currentImageIndex > 0) {
    translateGap = 16 * currentImageIndex;
  }

  return (
    <section className="productSlider">
      <div className="productSlider__container">
        <div className="productSlider__top">
          <h1 className="productSlider__title">{title}</h1>
          <div className="productSlider__buttons">
            <button type="button" onClick={prevImage} className="productSlider__button" disabled={currentImageIndex === 0}>
              {'<'}
            </button>
            <button type="button" onClick={nextImage} className="productSlider__button" disabled={currentImageIndex === maxCurrentImage}>
              {'>'}
            </button>
          </div>
        </div>
        <ul
          className="productSlider__list"
          style={{
            width: `${itemWidth * frameSize + gap * (frameSize - 1)}px`,
            transition: `${animationDuration}ms`,
          }}
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="productSlider__item"
              style={{
                transform: `translateX(${(-currentImageIndex * itemWidth) - translateGap}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductSlider;
