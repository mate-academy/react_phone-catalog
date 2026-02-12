import React, { useContext } from 'react';
import './SliderButtons.scss';
import { SliderContext } from '../../../../context/SliderContext';
import { icons } from '../../../../../../global-assets/static';
import { ScreenState } from '../../../../reducer/LangThemeReducer';

type SliderButtonProps = {
  itemAmount: number;
};

export const SliderButtons: React.FC<SliderButtonProps> = ({ itemAmount }) => {
  const { setButton, setCurrentSlideIndex, currentSlideIndex, slideWidth } =
    useContext(SliderContext);
  const { screenWidth } = useContext(ScreenState);
  const IconRight = icons.arrowRight.valuePath;
  const IconLeft = icons.arrowLeft.valuePath;
  const slidesPerView = Math.floor(screenWidth / slideWidth);

  const handlePrevSlide = () => {
    setButton('prev');

    if (currentSlideIndex + slidesPerView >= itemAmount) {
      setCurrentSlideIndex(0);
    } else {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    setButton('next');

    if (currentSlideIndex + slidesPerView >= itemAmount) {
      setCurrentSlideIndex(0);
    } else {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
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
