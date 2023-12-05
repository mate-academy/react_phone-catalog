import { useContext } from 'react';
import { BannerSLiderContext } from '../../BannerSliderContext';
import './Arrows.scss';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  children: React.ReactNode;
};

export const Arrows: React.FC<Props> = ({ children }) => {
  const {
    images,
    position,
    transitionDuration,
    setPosition,
    setTransitionDuration,
    setCurrentSlide,
    restartInterval,
  } = useContext(BannerSLiderContext);

  const prevSlideHandler = () => {
    const index = position - 1;

    if (index <= 0) {
      setPosition(index);
      setCurrentSlide(images[images.length - 1]);

      setTimeout(() => {
        setTransitionDuration(0);
        setPosition(images.length);
      }, transitionDuration);
    } else {
      setPosition(index);
      setCurrentSlide(images[index - 1]);
    }

    restartInterval();
  };

  const nextSlideHandler = () => {
    const index = position + 1;

    if (index >= images.length + 1) {
      setPosition(images.length + 1);
      setCurrentSlide(images[0]);

      setTimeout(() => {
        setTransitionDuration(0);
        setPosition(1);
      }, transitionDuration);
    } else {
      setPosition(index);
      setCurrentSlide(images[index - 1]);
    }

    restartInterval();
  };

  return (
    <>
      <div className="banner-slider__arrow">
        <button
          type="button"
          className="simple-button slider-left banner-slider__arrow--prev"
          onClick={prevSlideHandler}
        />
      </div>
      {children}
      <div className="banner-slider__arrow">
        <button
          type="button"
          className="simple-button slider-right banner-slider__arrow--next"
          onClick={nextSlideHandler}
        />
      </div>
    </>
  );
};
