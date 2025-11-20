import React, { useState, useEffect } from 'react';

export const ImageSlider = () => {


  const images = [
    'https://via.placeholder.com/1200x400/111111/ffffff?text=Promo+1',
    'https://via.placeholder.com/1200x400/222222/ffffff?text=Promo+2',
    'https://via.placeholder.com/1200x400/333333/ffffff?text=Promo+3',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Funções de navegação
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  return (

    <h1 className='slideHeader'>Welcome to Nice Gadgets store!</h1>

    <div className="image-slider">
      {/* Botão anterior */}
      <button className="image-slider__control image-slider__control--prev" onClick={handlePrev}>
        ‹
      </button>

      {/* Container de slides */}
      <div className="image-slider__track">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-slider__item ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Botão próximo */}
      <button className="image-slider__control image-slider__control--next" onClick={handleNext}>
        ›
      </button>

      {/* Indicadores (dots) */}
      <div className="image-slider__dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`image-slider__dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};

