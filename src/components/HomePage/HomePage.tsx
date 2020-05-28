import React, { useState } from 'react';
import './HomePage.scss';

export const HomePage = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [images] = useState<string[]>(
    [
      './img/Banner1.png', './img/Banner2.png', './img/Banner3.png',
    ],
  );

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
          <img src={images[currentImage]} alt="banner" />
        </div>
        <button type="button" onClick={() => handleSlide(1)} />
      </section>
    </main>
  );
};
