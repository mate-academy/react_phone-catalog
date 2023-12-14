import { useEffect, useState } from 'react';
import './BannerSlider.scss';

const imageUrls = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + imageUrls.length)
    % imageUrls.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="banner-buttons">
        <div className="slider-controls">
          <button
            type="button"
            onClick={handlePrev}
          >
            <img
              src="img/icons/arrowRight.svg"
              alt="arrowLeft"
              style={{ transform: 'rotate(-90deg)' }}
            />
          </button>
          <button
            type="button"
            onClick={handleNext}
          >
            <img
              src="img/icons/arrowRight.svg"
              alt="arrowRight"
              style={{ transform: 'rotate(90deg)' }}
            />
          </button>
        </div>
      </div>

      <div className="banner-slider">
        <div
          className="banner-slider__container"
          style={{ transform: `translateX(-${currentIndex * 1040}px)` }}
        >
          {imageUrls.map((src) => (
            <img key={src} src={src} alt="BannerSlide" className="slider-img" />
          ))}
        </div>

        <div className="box-dots">
          <div className="dots">
            <div className="group">
              <div className={currentIndex % 3 === 0 ? 'div active' : 'div'} />
            </div>
            <div className="rectangle-wrapper">
              <div className={currentIndex % 3 === 1 ? 'div active' : 'div'} />
            </div>
            <div className="div-wrapper">
              <div className={currentIndex % 3 === 2 ? 'div active' : 'div'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
