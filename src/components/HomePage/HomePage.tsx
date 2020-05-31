import React, { useState } from 'react';
import './HomePage.scss';
import { Product } from '../../helpers/interfaces';

export const HomePage = ({ products }: {products: Product[]}) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [images] = useState<string[]>(
    [
      './img/Banner1.png', './img/Banner2.png', './img/Banner3.png',
    ],
  );
  const imageSize = 1040;

  const handleSlide = (shift: number) => {
    if (currentImage === images.length - 1 && shift === 1) {
      setCurrentImage(0);

      return;
    }

    if (currentImage === 0 && shift === -1) {
      setCurrentImage(images.length - 1);

      return;
    }

    setCurrentImage(prev => prev + shift);
  };

  return (
    <main className="content">
      <section className="slider">
        <button type="button" className="slider__left-button" onClick={() => handleSlide(-1)} />
        <div className="slider__container">
          {images.map(image => (
            <img key={image} src={image} alt="banner" style={{ transform: `translate(${-imageSize * (currentImage)}px)` }} />
          ))}
        </div>
        <button type="button" onClick={() => handleSlide(1)} />
      </section>
      <section className="hot-price">
        <h2 className="hot-price__header">Hot Prices</h2>
        <div className="hot-price__slider">
          {products.map(product => (
            <article key={product.id} />
          ))}
        </div>
      </section>
    </main>
  );
};
