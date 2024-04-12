import { useSwiper } from 'swiper/react';
import classNames from 'classnames';
import { useState } from 'react';
import ArrowLeft from '../../../images/icons/arrow_left.svg';
import './swiperButtonPrev.scss';

export const SwiperButtonPrev = () => {
  const swiper = useSwiper();
  const [isBegin, setIsBegin] = useState(true);

  const handleClick = () => {
    swiper.slidePrev();
    swiper.updateProgress();
    setIsBegin(swiper.isBeginning);
  };

  return (
    <button
      type="button"
      // disabled={isBegin}
      className={classNames(
        'swiperButtonPrev',
        { 'swiperButtonPrev--disabled': isBegin },
      )}
      // disabled={isEnd}
      onClick={() => handleClick()}
    >
      <img
        src={ArrowLeft}
        alt="arrow left"
        className="swiperButtonPrev__img"
      />
    </button>
  );
};
