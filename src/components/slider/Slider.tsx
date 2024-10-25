import './Slider.scss';

import photo1 from '../../assets/images/slider/iPhone-14-Pro-vs-16.jpg';
import photo2 from '../../assets/images/slider/iPhone-16-Pro-and-iPhone-16.jpg';
import photo3 from '../../assets/images/slider/iPhone-16-Side-2-Feature.jpg';
import photo4 from '../../assets/images/slider/maxresdefault.jpg';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ArrowButton } from '../arrowButton/ArrowButton';

const imageFiles = [photo1, photo2, photo3, photo4];

export const Slider: React.FC = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex(prevIndex =>
        prevIndex === imageFiles.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderIndex]);

  const nextSlide = () => {
    setSliderIndex(prevIndex =>
      prevIndex === imageFiles.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setSliderIndex(prevIndex =>
      prevIndex === 0 ? imageFiles.length - 1 : prevIndex - 1,
    );
  };

  const setSlide = (index: number) => {
    setSliderIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;

    setTouchStartX(touchDown);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchDown = touchStartX;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;

    setTouchEndX(currentTouch);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const difference = touchStartX - touchEndX;

      if (difference > 50) {
        nextSlide();
      }

      if (difference < -50) {
        prevSlide();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slider__photos">
        <ArrowButton diraction="left" disable={false} click={prevSlide} />
        <div className="slider__photosContainer">
          <img
            src={imageFiles[sliderIndex]}
            alt="slider photo"
            className="slider__photo"
          />
        </div>
        <ArrowButton diraction="right" disable={false} click={nextSlide} />
      </div>
      <div className="slider__lines">
        {imageFiles.map((img, i) => (
          <div
            className={classNames('slider__line', {
              'slider__line--active': sliderIndex === i,
            })}
            key={i}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};
