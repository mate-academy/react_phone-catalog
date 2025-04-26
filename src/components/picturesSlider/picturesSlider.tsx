import { useState, useEffect } from 'react';
import './picturesSlider.scss';
import arrowLeft from '../../images/arrow-left.png';
import arrowRight from '../../images/arrow-right.png';
import image1 from '../../images/pictures-slider1.png';
import image2 from '../../images/pictures-slider2.png';
import image3 from '../../images/pictures-slider3.png';

const images = [image1, image2, image3];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="picturesSlider">
      <div className="picturesSlider__container">
        <button className="picturesSlider__button" onClick={prevImage}>
          <img
            src={arrowLeft}
            alt="arrowLeft"
            className="picturesSlider__button--arrow"
          />
        </button>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="picturesSlider__image"
        />
        <button className="picturesSlider__button" onClick={nextImage}>
          <img
            src={arrowRight}
            alt="arrowRight"
            className="picturesSlider__button--arrow"
          />
        </button>
      </div>
      <div className="picturesSlider__dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`picturesSlider__dot ${
              index === currentIndex ? 'active' : ''
            }`}
            onClick={() => selectImage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
