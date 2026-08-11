import { useEffect, useState } from 'react';
import scss from './PicturesSlider.module.scss';
import { Dashes } from './Dashes';
import { slides } from '../../../../assets/slider/slider';
import { Pictures } from './Pictures';
import { ButtonArrow } from '../../../shared/components/ButtonArrow';

export const PicturesSlider = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const slideCount = slides.length / 2;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prevSlide => {
        return prevSlide === slideCount - 1 ? 0 : prevSlide + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlide, slideCount]);

  const previousPicture = () => {
    setActiveSlide(current => (current === 0 ? slideCount - 1 : current - 1));
  };

  const nextPicture = () => {
    setActiveSlide(current => (current === slideCount - 1 ? 0 : current + 1));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    const touchEnd = e.changedTouches[0].clientX;

    const deltaX = touchStart - touchEnd;
    const SWIPE_THRESHOLD = 50;

    if (deltaX > SWIPE_THRESHOLD) {
      nextPicture();
    }

    if (deltaX < -SWIPE_THRESHOLD) {
      previousPicture();
    }
  };

  return (
    <article
      className={scss.slider}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ButtonArrow
        direction="left"
        onClick={previousPicture}
        className={scss.desktopOnly}
      />
      <Pictures activeSlide={activeSlide} />
      <Dashes
        activeSlide={activeSlide}
        count={slides.length / 2}
        setActiveSlide={setActiveSlide}
      />
      <ButtonArrow
        direction="right"
        onClick={nextPicture}
        className={scss.desktopOnly}
      />
    </article>
  );
};
