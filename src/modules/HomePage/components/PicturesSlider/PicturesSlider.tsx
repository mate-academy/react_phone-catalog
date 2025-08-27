import { useEffect, useState } from 'react';
import scss from './PicturesSlider.module.scss';
import { Dashes } from '../Dashes/Dashes';
import { slides } from '../../../../assets/slider/slider';
import { Pictures } from '../Pictures/Pictures';

export const PicturesSlider = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  useEffect(() => {
    const slideCount = slides.length / 2;

    const timer = setInterval(() => {
      setActiveSlide(prevSlide => {
        return prevSlide === slideCount - 1 ? 0 : prevSlide + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlide]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 20) {
      setActiveSlide(current =>
        current === slides.length / 2 - 1 ? 0 : current + 1,
      );
    }

    if (touchStart - touchEnd < -20) {
      setActiveSlide(current =>
        current === 0 ? slides.length / 2 - 1 : current - 1,
      );
    }
  };

  return (
    <div
      className={scss.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Pictures activeSlide={activeSlide} />
      <Dashes
        activeSlide={activeSlide}
        count={slides.length / 2}
        setActiveSlide={setActiveSlide}
      />
    </div>
  );
};
