import React, { useState, useEffect } from 'react';
import './Slider.scss';

const imagesMobile = [
  { url: '../../../img/slider/mobile/iphone.png', alt: 'iphone slide' },
  { url: '../../../img/slider/mobile/ipad.png', alt: 'ipad slide' },
  { url: '../../../img/slider/mobile/iwatch.png', alt: 'iwatch slide' },
];

const imagesTablet = [
  { url: '../../../img/slider/tablet/iphone.png', alt: 'iphone slide' },
  { url: '../../../img/slider/tablet/ipad.png', alt: 'ipad slide' },
  { url: '../../../img/slider/tablet/iwatch.png', alt: 'iwatch slide' },
];

export const Slider: React.FC = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState(imagesMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)');

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setImages(imagesTablet);
      } else {
        setImages(imagesMobile);
      }
    };

    // Initial check
    if (mediaQuery.matches) {
      setImages(imagesTablet);
    }

    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  function showNextImage() {
    setImageIndex(index => {
      if (index === images.length - 1) {
        return 0;
      }

      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex(index => {
      if (index === 0) {
        return images.length - 1;
      }

      return index - 1;
    });
  }

  return (
    <section className="slider">
      <button className="slider__button--left" onClick={showPrevImage}>
        <img
          src="../../../img/slider/svg/chevron (arrow left).svg"
          alt="chevron_left"
        />
      </button>

      <div className="slider__container">
        {images.map(({ url, alt }, index) => (
          <img
            key={url}
            src={url}
            alt={alt}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ transform: `translateX(${-100 * imageIndex}%)` }}
          />
        ))}
      </div>
      <div className="slider__dots">
        {images.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <div
                style={{
                  width: '14px',
                  height: '4px',
                  backgroundColor: '#000',
                  display: 'inline-block',
                }}
                aria-hidden
              />
            ) : (
              <div
                style={{
                  width: '14px',
                  height: '4px',
                  backgroundColor: '#E2E6E9',
                  display: 'inline-block',
                }}
                aria-hidden
              />
            )}
          </button>
        ))}
      </div>

      <button className="slider__button--right" onClick={showNextImage}>
        <img
          src="../../../img/slider/svg/chevron (arrow right).svg"
          alt="chevron_right"
        />
      </button>
    </section>
  );
};
