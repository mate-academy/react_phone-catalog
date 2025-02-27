import { useEffect, useState } from 'react';
import './Slider.scss';

const images = [
  '../public/img/banner-iphone.png',
  '../public/img/category-accessories.png',
  '../public/img/banner-phones.png',
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNextButton = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const handlePrevButton = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1) % images.length);
  };

  return (
    <div className="slider">
      <div className="slider__button">
        <button className="button" onClick={handlePrevButton}>
          &lt;
        </button>
      </div>

      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="slider__image"
      />
      <div className="slider__button">
        <button onClick={handleNextButton}>&gt;</button>
      </div>

      {/* <div></div> */}
    </div>
  );
};
