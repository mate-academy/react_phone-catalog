import React, { useContext } from 'react';
import './SliderButtons.scss';
import { SliderContext } from '../../context/SliderContext';
import { icons } from '../../../../global-assets/static';

type SliderButtonProps = {
  itemAmount: number;
};

export const SliderButtons: React.FC<SliderButtonProps> = ({ itemAmount }) => {
  const { setButton, setCurrentSlideIndex, currentSlideIndex } =
    useContext(SliderContext);

  const IconRight = icons.arrowRight.valuePath;
  const IconLeft = icons.arrowLeft.valuePath;

  const handlePrevSlide = () => {
    setButton('prev');

    const index = currentSlideIndex === 0 ? 0 : currentSlideIndex - 1;

    setCurrentSlideIndex(index);
  };

  const handleNextSlide = () => {
    setButton('next');

    const index =
      currentSlideIndex === itemAmount - 1 ? 0 : currentSlideIndex + 1;

    setCurrentSlideIndex(index);
  };

  return (
    <section className="btns-slider">
      <button
        className="btns-slider__btn btns-slider__btn--left"
        onClick={handlePrevSlide}
      >
        <IconLeft className="btns-slider__btn__image" />
      </button>
      <button
        className="btns-slider__btn btns-slider__btn--right"
        onClick={handleNextSlide}
      >
        <IconRight className="btns-slider__btn__image" />
      </button>
    </section>
  );
};
